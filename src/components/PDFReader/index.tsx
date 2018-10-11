import * as React from "react";
import { Component,Fragment } from 'react';
import * as CSSModules from "react-css-modules";
import * as styles from './index.less';
import * as pdfjsLib from 'pdfjs-dist';
// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.550/pdf.worker.js';
// the default params
const DEFAULT_DESIRE_WIDTH=980;
const DEFAULT_SCALE=1;
// const DEFAULT_MIN_SCALE=0.25;
// const DEFAULT_MAX_SCALE=10;

interface IProps {
  url:string,
  data:string,
  page:number
}
interface IStates {
  pdf:any,
  page:number,
  style:object,
  totalPage:number
}
export default class PDFReader extends Component<IProps, IStates> {
    state = {
      pdf:null,
      style:null,
      page:1
    }
    public constructor(props:IProps){
      super(props);
      this.canvas=React.createRef();
    }
    public componentDidMount () {
      const { url,data,showAllPage,onDocumentComplete } = this.props;
      const dom = this.canvas.current;
      if(url){
        let obj = {};
        //fetch pdf and render
        if(typeof url === 'string'){
          obj.url=url;
        }else if(typeof url=== 'object'){
          obj = url;
        }
        pdfjsLib.getDocument(obj).then((pdf)=>{
          //is exit onDocumentComplete or not
          if(onDocumentComplete){
             this.props.onDocumentComplete(pdf.numPages);
          }
          this.setState( { totalPage: pdf.numPages });
          this.setState({ pdf },()=>{
            if(showAllPage){
              this.renderAllPage();
            }else{
              this.renderPage(dom);
            }
          });
        })
      }else{
        //loaded the base64
        const loadingTask = pdfjsLib.getDocument({data});
        loadingTask.promise.then((pdf)=>{
          //is exit onDocumentComplete or not
          if(onDocumentComplete){
            this.props.onDocumentComplete(pdf.numPages);
          }
          this.setState({ pdf },()=>{
              if(showAllPage){
                this.renderAllPage();
              }else{
                this.renderPage(dom);
              }
          })
        })
      }
    }
    static getDerivedStateFromProps(props, state){
      return { ...state ,page:props.page};
    }
    //in the new lifestyle we can use this in shouldComponentUpdate
    shouldComponentUpdate(nextProps, nextState){
      const { pdf } = this.state;
      const { showAllPage } = nextProps;
      const dom = this.canvas.current;
      if(showAllPage)
      return true;
      if(nextProps.page!==this.state.page){
         this.renderPage(dom);
      }
      return true
    }
    private renderPage(dom){
      const { pdf } = this.state;
      const { width,scale } = this.props;
      pdf.getPage(this.state.page).then((page) => {
        let desiredWidth;
        //if this.props has width props
        if(width){
          desiredWidth = width;
        }else{
          desiredWidth = DEFAULT_DESIRE_WIDTH;
        }
        let desireScale;
        //if this.props has scale props
        if(scale){
          desireScale = scale
        }else{
          let templeView = page.getViewport(DEFAULT_SCALE);
          desireScale = desiredWidth / templeView.width;
        }
        const viewport = page.getViewport(desireScale);
        const canvas = dom;
        const canvasContext = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        this.setState({style:{
          height:canvas.height,
          width:canvas.width
        }});
        const renderContext = {
          canvasContext,
          viewport
        };
        page.render(renderContext);
      }
    }
    private renderAllPage(){
       const { pdf,totalPage } = this.state;
       const { width,scale } = this.props;
       if(totalPage>0){
         for(let i=0;i<totalPage;i++){
           const dom = this['canvas'+i];
           this.renderPage(dom);
         }
       }
    }
    public render():JSX.Element {
        const { style,totalPage } = this.state;
        const { showAllPage } = this.props;
        let tempArr = new Array(totalPage);
        tempArr.fill(0);
        return (
           <div style={style} className={styles["pdf__container"]}>
             {
               showAllPage?<Fragment>
                              {
                                tempArr.map((item,index)=>{
                                  return <canvas ref={(canvas) => { this['canvas'+index] = canvas; }} key={index+''}/>
                                })
                              }
                          </Fragment>
                          :
                          <canvas ref={this.canvas}/>
             }
           </div>
        );
    }
}
