function changeItem(data){
    let args;
    data['menuActive']=menuActive;
    $.ajax({
        url: "/api/items/",
        method: "POST",
        headers: {'X-CSRFToken': csrf},
        data: data,
        dataType: "json",
    }).done(function(response) {
        react_content.setState({listItem: response.newData});
        console.log('!!!!!!!!!');
        console.log(response.newData);
        console.log('!!!!!!!!!');
    }).fail(function (error) {
        console.log(error);
    });
}

class Poisk extends React.Component {
    constructor(props) {
        super(props);
        this.state = {country: 'all',maxPrice:'10000',minPrice:'0',maxVolume:'5',minVolume:'0',maxPPM:'100',minPPM:'0'};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeMaxPrice = this.changeMaxPrice.bind(this);
        this.changeMinPrice = this.changeMinPrice.bind(this);
        this.changeMaxVolume = this.changeMaxVolume.bind(this);
        this.changeMinVolume = this.changeMinVolume.bind(this);
        this.changeMaxPPM = this.changeMaxPPM.bind(this);
        this.changeMinPPM = this.changeMinPPM.bind(this);
        window.react_poisk = this;
    }

    handleChange(event) {
        this.setState({country: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        changeItem(this.state);
    }

    changeMaxPrice(event) {
        if(+event.target.value > +this.state.minPrice){
            this.setState({maxPrice: event.target.value});
        }
    }
    changeMinPrice(event) {
        if(+event.target.value < +this.state.maxPrice){
            this.setState({minPrice: event.target.value});
        }
    }
    changeMaxVolume(event) {
        if(+event.target.value > +this.state.minVolume){
            this.setState({maxVolume: event.target.value});
        }
    }
    changeMinVolume(event) {
        if(+event.target.value < +this.state.maxVolume){
            this.setState({minVolume: event.target.value});
        }
    }

    changeMaxPPM(event) {
        if(+event.target.value > +this.state.minPPM){
            this.setState({maxPPM: event.target.value});
        }
    }
    changeMinPPM(event) {
        if(+event.target.value < +this.state.maxPPM){
            this.setState({minPPM: event.target.value});
        }
    }
    reset() {
        this.setState({country: 'all',maxPrice:'10000',minPrice:'0',maxVolume:'5',minVolume:'0',maxPPM:'100',minPPM:'0'});
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className='poisk-left'>
                    <div className='name'>Цена</div>
                    <div className='name'>Обьем</div>
                    <div className='name'>Градусы</div>
                    <div className='name'>Страна производитель</div>
                </div>
                <div className='poisk-right'>
                    <div className="range">
                        <input className="min" type="number" value={this.state.minPrice} onChange={this.changeMinPrice}/>
                        <div className="rangeslider">
                            <input className="min" type="range" step='50' value={this.state.minPrice}  name="volume" min='0' max='10000' onChange={this.changeMinPrice}/>
                            <input className="max" type="range" step='50' value={this.state.maxPrice}  name="volume" min='0' max="10000" onChange={this.changeMaxPrice}/>
                        </div>
                        <input className="max" type="number" value={this.state.maxPrice} onChange={this.changeMaxPrice}/>
                    </div>

                    <div className="range">
                        <input className="min" type="number" value={this.state.minVolume} onChange={this.changeMinVolume}/>
                        <div className="rangeslider">
                            <input className="min" type="range" step='0.1' value={this.state.minVolume} name="volume" min='0' max='5' onChange={this.changeMinVolume}/>
                            <input className="max" type="range" step='0.1' value={this.state.maxVolume} name="volume" min='0' max="5" onChange={this.changeMaxVolume}/>
                        </div>
                        <input className="max" type="number" value={this.state.maxVolume} onChange={this.changeMaxVolume}/>
                    </div>

                    <div className="range">
                        <input className="min" type="number" value={this.state.minPPM} onChange={this.changeMinPPM}/>
                        <div className="rangeslider">
                            <input className="min" type="range" step='1' value={this.state.minPPM} name="PPM" min='0' max='100' onChange={this.changeMinPPM}/>
                            <input className="max" type="range" step='1' value={this.state.maxPPM} name="PPM" min='0' max="100" onChange={this.changeMaxPPM}/>
                        </div>
                        <input className="max" type="number" value={this.state.maxPPM} onChange={this.changeMaxPPM}/>
                    </div>
                    <div className='block-button'>
                        <label>
                            <select id='select' value={this.state.country} onChange={this.handleChange}>
                                <option value="all" className="all">Любая </option>
                                <option value="rus" className='rus'>Россия</option>
                                <option value="ua" className='ua'>Украина</option>
                                <option value="pol" >Польша</option>
                                <option value="arm">Армения</option>
                                <option value="franc">Франция</option>
                                <option value="ger">Германия</option>
                                <option value="icp">Испания</option>
                            </select>
                        </label>
                        <input type="submit" value="Фильтровать" />
                    </div>
                </div>
            </form>
        );
    }
}


ReactDOM.render(
    <Poisk />,
    document.getElementById('poisk')
);


