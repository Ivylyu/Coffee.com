module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = (item,id) => {
        let storedItem = this.items[id];
        if(!storedItem) {
            storedItem = this.items[id] = {item: item, qty:0,price:0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    };

    this.removeByOne = (item,id) => {
        let storedItem = this.items[id];
        if(!storedItem) {
            storedItem = this.items[id] = {item: item, qty:0,price:0};
        }
        storedItem.qty--;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty--;
    }

    this.generateArray = ()=>{
        var arr = [];
        for(let id in this.items){
            arr.push(this.items[id]);
            console.log(this.items[id].item.title)
        }
        return arr;
    }
};