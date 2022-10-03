import React from 'react'
import axios from 'axios'


class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            firstName: "",
            lastName: "",
            role: ""
        };
    }

    componentDidMount() {
        const that = this;
        console.log(localStorage.getItem('userId'));
        axios({

            // Endpoint to send files
            url: "http://localhost:8080/api/user/getuserDetail",
            method: "GET",
            params: {
                mobileno: localStorage.getItem('userId')
            }
        })

            .then(function (response) {
                console.log(response);
                return response;

            })
            .then(function (jsonData) {
                console.log(jsonData);
                that.setState({ userId: jsonData.data.user.userId });
                that.setState({ firstName: jsonData.data.user.firstName });
                that.setState({ lastName: jsonData.data.user.lastName });
                that.setState({ role: jsonData.data.user.role });
            });
    }

    render() {
        return (
            <>
                {!localStorage.getItem('role') ? <></> : <><h3>{localStorage.getItem('role')} Home page</h3><hr/>
                    <table className="table table-striped table-light text-left">
                        <tbody>
                            <tr>
                                <td>User Id</td>
                                <td>{this.state.userId}</td>
                            </tr>
                            <tr>
                                <td>First Name</td>
                                <td>{this.state.firstName}</td>
                            </tr>
                            <tr>
                                <td>Last Name</td>
                                <td>{this.state.lastName}</td>
                            </tr>
                            <tr>
                                <td>Role</td>
                                <td>{this.state.role}</td>
                            </tr>
                        </tbody>
                    </table></>}
            </>
        )
    }
}

export default HomePage

// function HomePage() {

//     return (


//         <>
//              {!localStorage.getItem('role') ? <></> :<><h2>{localStorage.getItem('role')} Home page</h2>
//             <table className="table table-striped table-hover">
//                 <tr>
//                     <td>First Name</td>
//                     <td></td>
//                 </tr>
//             </table></>}
//         </>

//     )
// }

// export default HomePage