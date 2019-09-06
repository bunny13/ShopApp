import moment from "moment";

class Order {
    constructor(id, items, totalAmt, orderedDate){
        this.id = id;
        this.items = items;
        this.totalAmt = totalAmt;
        this.orderedDate = orderedDate;
    }

    get getDate(){
        return moment(this.orderedDate).format("MMMM Do YYYY, hh:mm");
    }

}

export default Order;
