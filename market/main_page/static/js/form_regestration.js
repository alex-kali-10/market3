function getFormRegistr(obj){
    $.ajax({
        url: "/api/registration/",
        method: "GET",
        headers: {'X-CSRFToken': csrf},
        dataType: "json",
    }).done(function(response) {
        console.log('!!!!!!!!!');
        console.log(response.form);
        obj.setState({form: response.form});
    }).fail(function (error) {
        console.log('???????????');
        console.log(error);
    });
}


function AjaxForm(obj,data) {
    $.ajax({
        url:     "/api/registration/", //url страницы (action_ajax_form.php)
        type:     "POST", //метод отправки
        dataType: "json", //формат данных
        headers: {'X-CSRFToken': csrf},
        data: data,  // Сеарилизуем объект
        success: function(response) { //Данные отправлены успешно
            console.log(response.form);
            obj.setState({form: response.form});
        },
        error: function(response) { // Данные не отправлены
            console.log(response);
        }
    });
}








class Form_regestration extends React.Component {
    constructor(props) {
        super(props);
        this.state = { form: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        getFormRegistr(this);
    }



    handleSubmit(event) {
        AjaxForm( this,$( '#reg_form' ).serializeArray());
        event.preventDefault();
    }

    render() {
        let form = this.state.form;
        return (
            <form id='reg_form' onSubmit={this.handleSubmit}>
                <div dangerouslySetInnerHTML={{__html: form }}></div>
                <input type="submit" value="Зарегестрироваться" />
            </form>
        );
    }
}


