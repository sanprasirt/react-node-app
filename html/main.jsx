class Signin extends React.Component {
    handleEmailChange(e){
        this.setState({email:e.target.value})
    }
    handlePasswordChange(e) {
        this.setState({password:e.target.value})
    }
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.state = {
            email:'',
            password:''
        };
    }
    signIn(){
        alert('Email address is ', + this.state.email + ' Password is ' + this.state.password);
    }
    render() {
        return (
            <form className="form-signin">
                <h2 className="form-signin-heading"> Please sign in </h2>
                <label for="inputEmail" className="sr-only"> Email address </label>
                <input type="email" onChange={this.handleEmailChange} id="inputEmail" className="form-control" placeholder="Email address" required autofocus />
                <label for="inputPassword" className="sr-only"> Password</label>
                <input type="password" onChange={this.handlePasswordChange} id="inputPassword" className="form-control" placeholder="Password" required />
                <button className="btn btn-lg btn-primary btn-block" onClick={this.signIn} type="button"> Sign in
                </button>
            </form>
        )
    }
}

ReactDOM.render(<Signin/>, document.getElementById('app'));