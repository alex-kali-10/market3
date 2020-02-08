function getAllItem(obj,data){
    console.log('ASFDDASFSDFSDF');
    let args;
    $.ajax({
        url: "/api/all_items/",
        method: "POST",
        headers: {'X-CSRFToken': csrf},
        data: data,
        dataType: "json",
    }).done(function(response) {
        obj.setState({listItem: response.newData});
    }).fail(function (error) {
        console.log(error);
    });
}

function getBestItem(obj,data){
    let args;
    $.ajax({
        url: "/api/best_item/",
        method: "POST",
        headers: {'X-CSRFToken': csrf},
        data: data,
        dataType: "json",
    }).done(function(response) {
        console.log('!!!!!!!!!!!!');
        console.log( response.newData);
        obj.setState({listBestItem: response.newData});
    }).fail(function (error) {
        console.log(error);
    });
}

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = { menuActive: 1 ,listItem:'',listKorz:[],countItemKorz:0,listBestItem:''};
        window.react_content = this;
    }

    addKorz(event,id){
        if(this.state.listItem !== ''){
            for(let i in this.state.listItem){
                if(this.state.listItem[i].id === id){
                    this.state.listKorz[id] = this.state.listItem[i];
                    this.state.listKorz[id]['count'] = 1;
                    break
            }}}else{
            for(let i in this.state.listBestItem) {
                if (this.state.listBestItem[i].id === id) {
                    console.log(this.state.listKorz);
                    this.state.listKorz[id] = this.state.listBestItem[i];
                    console.log(this.state.listKorz);
                    this.state.listKorz[id]['count'] = 1;
                    break
                }
            }}

            this.setState({countItemKorz:this.state.listKorz.length});
            console.log('пытаюсь');
            $('#item'+id+' .korz-item').addClass('item-in-korz');
            }


    plusItem(event,id){
        let item = this.state.listKorz;
        item[id].count+=1;
        this.setState({listKorz : item});
        react_korz.update();
    }
    minusItem(event,id){
        let item = this.state.listKorz;
        item[id].count-=1;
        if (item[id].count === 0){
            delete item[id]
        }
        this.setState({listKorz : item});
        react_korz.update();
    }

    deleteItem(event,id){
        let item = this.state.listKorz;
        delete item[id];
        this.setState({listKorz : item});
        react_korz.update();
    }

    render() {
        let itemList;
        let listKorz;
        let listBestItem;
        if(this.state.menuActive!==1 && this.state.menuActive!==8 && this.state.listItem === ''){
            getAllItem(this,{menuActive:this.state.menuActive});
        }
        if(this.state.menuActive===1 && this.state.listBestItem === ''){
            getBestItem(this,{});
        }
        if(this.state.listBestItem != '' && this.state.menuActive===1){
            listBestItem = this.state.listBestItem.map((item)=>
                <div key={item.id} id = {'item'+item.id} className="block-item">
                    <div className='country-item'>{item.country}</div>
                    <div className='name-item'>{item.name.slice(0,30)}</div>
                    <div className='avatar-item' style={{ backgroundImage : 'url('+item.avatarUrl+')' }}></div>
                    <div className='volume-item'>Обьем: {item.volume} Л.</div>
                    <div className='ppm-item'>Крепость: {item.ppm} %</div>
                    <div className='price-item'>{item.price} P.</div>
                    {(item.id in this.state.listKorz)?(
                        <div className='korz-item item-in-korz' onClick={(e) => this.addKorz(e,item.id)}></div>
                    ):(
                        <div className='korz-item' onClick={(e) => this.addKorz(e,item.id)}></div>
                    )}
                    <div className='more-item' onClick={(e) => aboutItem(e,item.id)}>Подробнее</div>
                </div>
            );}

        if(this.state.listItem != '' && this.state.menuActive!==1){
            console.log(this.state.listItem.map);
            itemList = this.state.listItem.map((item)=>
                <div key={item.id} id = {'item'+item.id} className="block-item">
                    <div className='country-item'>{item.country}</div>
                    <div className='name-item'>{item.name.slice(0,30)}</div>
                    <div className='avatar-item' style={{ backgroundImage : 'url('+item.avatarUrl+')' }}></div>
                    <div className='volume-item'>Обьем: {item.volume} Л.</div>
                    <div className='ppm-item'>Крепость: {item.ppm} %</div>
                    <div className='price-item'>{item.price} P.</div>
                    {(item.id in this.state.listKorz)?(
                        <div className='korz-item item-in-korz' onClick={(e) => this.addKorz(e,item.id)}></div>
                    ):(
                        <div className='korz-item' onClick={(e) => this.addKorz(e,item.id)}></div>
                    )}
                    <div className='more-item' onClick={(e) => aboutItem(e,item.id)}>Подробнее</div>
                </div>
        );}
        if(this.state.menuActive===8 && this.state.listKorz !== '' && this.state.menuActive !== 1){
            listKorz = this.state.listKorz.map((item)=>
                <div key={item.id} className="block-item">
                    <div className='country-item'>{item.country}<div className='delete' onClick={(e) => this.deleteItem(e,item.id)}  ></div></div>
                    <div className='name-item'>{item.name.slice(0,30)}</div>
                    <div className='avatar-item' style={{ backgroundImage : 'url('+item.avatarUrl+')' }}></div>
                    <div className='volume-item'>Обьем: {item.volume} Л.</div>
                    <div className='ppm-item'>Крепость: {item.ppm} %</div>
                    <div className='price-item'>{item.price} P.</div>
                    <div className='space-count'><div className='left-button' onClick={(e) => this.minusItem(e,item.id)}  ></div><div className='count'>{item.count}</div><div className='count-price'>{item.count * item.price} P.</div><div className='right-button' onClick={(e) => this.plusItem(e,item.id)}></div></div>
                    <div className='more-item' onClick={(e) => aboutItem(e,item.id)}>Подробнее</div>
                </div>
            );}
        console.log(this.state.listItem);
        console.log(this.state.listBestItem);
        return (

            <div>
                {(this.state.menuActive === 1)?(
                    <div className='about-kb'>
                        «Красное&Белое» — сеть магазинов, осуществляющая продажу алкоголя различных видов.
                        <div className='best-item-slider'>
                            <div className='slider-button slider-button-left' onClick={(e) => $(".best-item").animate({ scrollLeft: $(".best-item").scrollLeft()-260},140)}></div>
                            <div className='slider-button slider-button-right'onClick={(e) => $(".best-item").animate({ scrollLeft: $(".best-item").scrollLeft()+260},140)}></div>
                            <div className='best-item'>
                                {listBestItem}
                            </div>
                        </div>
                    </div>
                ):(
                    (this.state.menuActive !== 8)?(
                        (this.state.listItem !== '')?(
                            itemList
                        ):(
                            <div  className="block-loader">
                                <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div> </div>
                            </div>
                        )
                    ):(
                        listKorz
                    )
                )}
                <div className='add-bot-area'></div>
            </div>
    );
    }
}

ReactDOM.render(
<Content />,
    document.getElementById('content')
);