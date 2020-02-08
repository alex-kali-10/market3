class MyKorz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {price: 'false'};
        window.react_korz = this;
    }

    update(){
        console.log('обновляюся');
        console.log(react_content.state.listKorz);
        let listItem =react_content.state.listKorz;
        if(listItem.length === 0){
            this.setState({price: 'false'})
        }else{
            let price = 0;
            let item;
            for(item of listItem){
                if(item!== undefined){
                    price+= item.price * item.count;
                }
            }
            this.setState({price: price});
        }
    }

    render() {
        return (
            <div className='in-korz'>
                {(this.state.price !=  'false')?(
                    <div>
                        <div className='all-price'>{this.state.price} P.</div>
                        <div className='buy-item'>Оформить заказ</div>
                    </div>
                ):(
                    <div className='not-buy-item'>Пустовато</div>
                )}
            </div>
        );
    }
}



ReactDOM.render(
    <MyKorz />,
    document.getElementById('korz')
);