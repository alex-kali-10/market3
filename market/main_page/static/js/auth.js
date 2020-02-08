class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username:user,password: ''};
        window.react_auth = this;
    }

    render() {
        console.log(this.state);
        return (
            <div className="auth">
                <div className='labelkb'></div>
                <div className='labelkb2'></div>
                {(this.state.username != 'AnonymousUser')?(
                    <div>
                        <div className='about-me' onClick={log}>{this.state.username}</div>
                    </div>
                ):(
                    <div>
                        <div className="button-login" onClick={log}>
                            Авторизироваться
                        </div>
                    </div>
                )}
            </div>
        );
    }
}


ReactDOM.render(
    <Auth />,
    document.getElementById('auth')
);