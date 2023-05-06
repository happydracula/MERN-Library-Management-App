<html>

<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    <script src="react/react.development.js"></script>
    <script src="react/react-dom.development.js"></script>
    <script src="react/prop-types.js"></script>
    <script src="react/axios.min.js"></script>
    <script src="react/babel.min.js"></script>
</head>

<div id="root"></div>
<script type="text/babel">
    class App extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
    empid:'',
    empname: '',
    empdata:[]
    }
    };

    handleSubmit(e){
    e.preventDefault();
    const mydata1=
    {
    empid: this.state.empid,
    empname:this.state.empname
    };
    axios({
    method: "POST",
    url:"http://localhost:8888/api/savedata",
    data: mydata1,

    }).then((response)=>{
    console.log("Data has been sent to server");
    if (response.data.status === 'success'){
    console.log("Data has been submitted");
    //alert("Employee Inserted. "+response.data.mydata.empid+":"+response.data.mydata.empname)
    console.log(response.data.mydata.empid+":"+response.data.mydata.empname+":"+response.data.mydata.serverMessage);
    const myresponsedata = JSON.stringify(response.data.mydata)
    this.setState({empdata:myresponsedata})
    this.resetForm()
    }else if(response.data.status === 'fail'){
    alert("Duplicate Emplyee ID")
    this.resetForm()
    }

    })
    .catch((e) => {
    console.log("Internal Server error"+e);
    });;

    };

    resetForm(){
    this.setState({empid: '', empname: ''})
    };
render(){

   return);
}
}
</body>

</html>