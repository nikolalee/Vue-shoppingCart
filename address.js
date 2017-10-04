new Vue({
    el: "#root",
    data: {
        "addressList": [],
        "blockNum": 3,
        "currIndex": 0,
        "showFlag": false,
        "currAddr": '',
        "shippingMethod":1
    },
    mounted: function () {
        this.getJson();
    },
    computed: {
        addressFilter: function () {
            return this.addressList.slice(0, this.blockNum);
        }
    },
    methods: {
        getJson: function () {
            this.$http.get("data/address.json").then(res => {
                this.addressList = res.body.result;
            })
        },
        setDefault: function (addressId) {
            this.addressList.forEach((item, index) => {
                if (item.addressId === addressId) {
                    item.isDefault = true;
                } else {
                    item.isDefault = false;
                }
            })
        },
        confirmDel: function (item) {
            this.showFlag = true;
            this.currAddr = item;
        },
        delAddr: function () {
            let index = this.addressList.indexOf(this.currAddr);
            this.addressList.splice(index, 1);
            this.showFlag = false;
        },
        toggleMore:function(){
            if(this.blockNum===3){
                this.blockNum=this.addressList.length;
            }else{
                this.blockNum=3;
            }
        }
    }
});