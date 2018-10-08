import * as React from "react";
import {Component,Fragment} from 'react';
import WebPDF from "./components/WebPDF/index";
export default class PDFTest extends Component{
  state = {
    page:1
  }
  private changePage=()=>{
    const { page } = this.state;
    this.setState({
      page:page+1
    })
  }
  public render(){
    const { page } = this.state;
    return <Fragment>
              <WebPDF url='/test.pdf' page={page}/>
              <button onClick={this.changePage}>button</button>
          </Fragment>
  }
}
