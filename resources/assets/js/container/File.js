import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import FileViewer from 'react-file-viewer';
import FileContainer from '../component/FileContainer'
import { throws } from 'assert';
const path = 'http://127.0.0.1:8000/';
axios.defaults.baseURL=path; 
const base_path = path + 'storage/';

 class File extends Component {

  
   state= {
       selectedFile : null,
       fileLists : null,
       type : null ,
       file : null

   }

    fileSelectorHandler =  event =>{
        console.log(event.target.files[0]);
        this.setState({
            selectedFile : event.target.files[0]
        });
    
    }

    onClickHandler = () =>{
        
        const fd = new FormData();
        var headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', 
            
        }
        fd.append('file',this.state.selectedFile,this.state.selectedFile.name)
        fd.append('name',this.state.selectedFile.name)
        axios.post('upload',fd, {headers: headers}).then(res=>{
            this.fetchFile();
        }).catch(err =>{
            console.log(err)
        });
    }
    componentDidMount(){
        this.fetchFile();
    }

    fetchFile(){
        axios.get('http://127.0.0.1:8000/getfilelists').then(res=>{
           // console.log(res.data);
            this.setState({
                fileLists:res.data
            })
        }).catch(err =>{
            console.log(err)
        });
    }
    view(file){
        let type = file.split('.')[1];
        
        this.setState({
            file : base_path + file,
            type : type
        })
    }
    render() {
        
            let fileList= 'No Files Found';
            if(this.state.fileLists != null){
                fileList = this.state.fileLists.map((ctrl,i)=>(   
                    <FileContainer  clicked={() =>this.view(ctrl.file)}  key={ctrl.id} id={i+1} file={ctrl.file}></FileContainer>
                )) 
            }
            
    
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header"></div>
                                <div className="card-body">
                                    <input style={{display:'none'}} type="file" onChange={this.fileSelectorHandler} ref={fileInput => this.fileInput = fileInput} />
                                    <button onClick={() => this.fileInput.click()}>pick file</button>
                                    <span ><button className="text-right" onClick={this.onClickHandler}>upload</button></span>
                                </div>
                            </div>
                        {fileList}
                              
                    </div>
                    <div className="col-md-6">
                    <FileViewer
                            fileType={this.state.type}
                            filePath={this.state.file}
                        /> 
                    </div>
                </div>
            </div>
        );
    }
}

export default File;
