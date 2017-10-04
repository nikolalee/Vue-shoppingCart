new Vue({
    el:"#app",
    data:{
        totalMoney:0,
        productList:[],
        checkAllFlag:false,
        totalPrice:0,
        showFlag:false,
        currProduct:''
    },
    mounted:function(){
        this.cartview();
    },
    filters:{
        money:function(value){
            return "￥"+value.toFixed(2);
        }
    },
    methods:{
        cartview:function(){
            this.$http.get("data/cartData.json",{id:"123"}).then(res=>{
                this.productList=res.body.result.list;
                this.totalMoney=res.body.result.totalMoney;
            });
        },
        changeQuantity:function(value,flag){
            if(flag>0){
                value.productQuantity++;
            }else{
                if(value.productQuantity>0){
                    value.productQuantity--;
                }
            }
            this.calSum();
        },
        checkOrNot:function(value){
            if(typeof value.check==='undefined'){
                Vue.set(value,"check",true);
            }else{
                value.check=!value.check;
            }
            this.calSum();
        },
        checkAll:function(flag){
            this.checkAllFlag=flag;
            let _this=this;
            this.productList.forEach(function(value){
                if(typeof value.check==="undefined"){
                    _this.$set(value,"check",_this.checkAllFlag);
                }else {
                    value.check=_this.checkAllFlag;
                }
            });
            this.calSum();
        },
        calSum:function(){
            let _this=this;
            _this.totalPrice=0;
            this.productList.forEach(function(value){
                if(value.check)
                _this.totalPrice+=value.productPrice*value.productQuantity;
            })
        },
        delConfirm:function(item){
            this.showFlag=true;
            this.currProduct=item;
        },
        delProduct:function(){
            let index=this.productList.indexOf(this.currProduct);
            this.productList.splice(index,1);
            this.showFlag=false;
        }
    }
});