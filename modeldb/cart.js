module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = (item,id) => {
        let storedItem = this.items[id];
        if(!sotredItem) {
            storedItem = this.items[id] = {item: item, qty:0,price:0};
        }
        storedItem.qty++;
        storedItem.price = stpredItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    };

    this.generateArray = ()=>{
        var arr = [];
        for(let id in this.items){
            err.push(this.items[id]);
        }
        return arr;
    }
};