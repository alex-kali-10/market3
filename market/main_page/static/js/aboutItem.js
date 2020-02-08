function infItem(data){
    $.ajax({
        url: "/api/infItem/",
        method: "POST",
        headers: {'X-CSRFToken': csrf},
        data: data,
        dataType: "json",
    }).done(function(response) {
        react_about_item.setState({item:response.item});
        react_about_item.setState({comments:response.comments});
        console.log(response.item.rate);
        if(response.item.rate !== 'false'){
            $("#star-"+ (response.item.rate-1)).attr('checked',true)
        }
    }).fail(function (error) {
        console.log(error);
    });
}


function changeRate(data){
    $.ajax({
        url: "/api/rate/",
        method: "POST",
        headers: {'X-CSRFToken': csrf},
        data: data,
        dataType: "json",
    }).done(function(response) {
        let item = react_about_item.state.item;
        item.avg_rate = response.new_avg;
        react_about_item.setState({item:item});
    }).fail(function (error) {
        console.log(error);
    });
}

function new_comment(data){
    $.ajax({
        url: "/api/new_comment/",
        method: "POST",
        headers: {'X-CSRFToken': csrf},
        data: data,
        dataType: "json",
    }).done(function(response) {
        if(react_about_item.state.comments !== "false") {
            let comments = Object.assign(response.comments, react_about_item.state.comments);
            react_about_item.setState({comments: comments});
        }else{
            react_about_item.setState({comments: response.comments});
        }
    }).fail(function (error) {
        console.log(error);
    });
}


function OldComments(data){
    $.ajax({
        url: "/api/old_comments/",
        method: "POST",
        headers: {'X-CSRFToken': csrf},
        data: data,
        dataType: "json",
    }).done(function(response) {
        console.log(response.comments);
        let comments = Object.assign(react_about_item.state.comments,response.comments);
        react_about_item.setState({comments: comments});
    }).fail(function (error) {
        console.log(error);
    });
}

function deleteComment(data){
    $.ajax({
        url: "/api/delete_comment/",
        method: "POST",
        headers: {'X-CSRFToken': csrf},
        data: data,
        dataType: "json",
    }).done(function(response) {
        console.log(response);
        console.log(data.id);
        let comments = react_about_item.state.comments;
        delete comments[data.id];
        react_about_item.setState({comments: comments});
    }).fail(function (error) {
        console.log(error);
    });
}






class AboutItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {item:'',username:react_auth.state.username,comments: 'false'};
        window.react_about_item = this;
        this.toRate = this.toRate.bind(this);
        this.moreComment = this.moreComment.bind(this);
    }

    toRate(e){
        let rate = +$('input[name=reviewStars]:checked').attr("id").substr(-1)+1;
        changeRate({id:this.state.item.id,rate:rate,username:react_auth.state.username,password:react_auth.state.password});
    }

    moreComment(e){
        let data = {id:react_about_item.state.item.id};
        data.lastComment = Object.values(this.state.comments)[0].id;
        OldComments(data);
    }


    deleteComment(e){
        console.log(e.target.name);
        deleteComment({id:e.target.name ,username: react_auth.state.username,password: react_auth.state.password});
    }


    render() {
        const item = this.state.item;
        const username = this.state.username;
        let comments = this.state.comments;
        let commentsList;
        if(comments !== 'false'){
            comments =	Object.values(comments);
            commentsList = comments.map((item) =>
                <div key={item.id}>
                    {item.username == username ? (
                        <div className="blockComment">
                            <div className = "blockAvatar" style={{ backgroundImage : 'url('+item.avatarUrl+')' }}><div></div></div>
                            <div className = "name">{item.username}</div>
                            <div className = "text">{item.text}</div>
                            <div className="deleteMesage">
                                <input  className="destroy" name={item.id} value="✖" onClick={this.deleteComment}  type="button"></input>
                            </div>
                        </div>
                    ) : (
                        <div className="blockComment">
                            <div className = "blockAvatar" id ={'m'+item.id} style={{ backgroundImage : 'url('+item.avatarUrl+')' }} ><div></div></div>
                            <div className = "name">{item.username}</div>
                            <div className = "text">F{item.text}</div>
                        </div>
                    )
                    }
                </div>
        );}else{
            commentsList = <div className='no-comment'>Нет комментариев</div>
        }
        return (
            <div>
                {(item == '')?(
                    <div  className="block-loader">
                        <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div> </div>
                    </div>
                ):(
                    <div>
                        <div key={item.id} className="block-item">
                            <div className='country-item'>{item.country}</div>
                            <div className='name-item'>{item.name.slice(0,30)}</div>
                            <div className='avatar-item' style={{ backgroundImage : 'url('+item.avatarUrl+')' }}></div>
                            <div className='volume-item'>Обьем: {item.volume} Л.</div>
                            <div className='ppm-item'>Крепость: {item.ppm} %</div>
                            <div className='price-item'>Цена: {item.price} P.</div>
                        </div>
                        {(username != 'AnonymousUser')?(
                            <div className='star'>
                                <div className='star1'>
                                    <div id="reviewStars-input">
                                        <input id="star-4" type="radio" name="reviewStars"/>
                                        <label title="gorgeous" htmlFor="star-4"></label>

                                        <input id="star-3" type="radio" name="reviewStars"/>
                                        <label title="good" htmlFor="star-3"></label>

                                        <input id="star-2" type="radio" name="reviewStars"/>
                                        <label title="regular" htmlFor="star-2"></label>

                                        <input id="star-1" type="radio" name="reviewStars"/>
                                        <label title="poor" htmlFor="star-1"></label>

                                        <input id="star-0" type="radio" name="reviewStars"/>
                                        <label title="bad" htmlFor="star-0"></label>
                                    </div>
                                    <div className='star2' onClick={this.toRate}>Поставить оценку</div>
                                    <div className='star3'>{item.avg_rate}</div>
                                    <div className='star4'>Средняя оценка</div>
                                </div>
                            </div>
                        ):(
                            <div  className='star-6'>
                                <div className='star3'>{item.avg_rate}</div>
                                <div className='star4'>Средняя оценка</div>
                            </div>
                        )}
                        <div className='comment-block'>
                            <div onClick={this.moreComment} className='more-comments'>Загрузить еще коментарии</div>
                                { commentsList }
                            {(username != 'AnonymousUser')?(
                                    <MyComment/>
                                ):(
                                    <div></div>
                                )}
                        </div>
                        <div className='add-bot-area'></div>
                    </div>
                )}
            </div>
        );
    }
}


class MyComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text:''};

        this.text = this.text.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    text(e){
        this.setState({text: e.target.value});
    }
    onSubmit(e){
        new_comment({id:react_about_item.state.item.id,username:react_auth.state.username,password:react_auth.state.password,text:this.state.text});
    }

    render() {
        console.log(react_auth.state.avatarUrl);
        return (
            <div className='my-comment'>
                <div className='avatar' style={{ backgroundImage: `url(`+ react_profile.state.avatarUrl +`)` }}></div>
                <textarea  value={this.state.text} onChange={this.text}  name="text" maxLength="200" required="" id="id_text"/>
                <div className='submit' onClick={this.onSubmit}></div>
            </div>
        );
    }
}
