import * as React from "react";
import * as CSSModules from "react-css-modules";
import * as styles from './index.less';
import * as pdfjsLib from 'pdfjs-dist';
const pdfjsViewer = require('../../../node_modules/pdfjs-dist/web/pdf_viewer.js');
// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.550/pdf.worker.js';
// the default params
const DEFAULT_DESIRE_WIDTH=980;

interface IProps {
  url:string,
  data:string,
  page:number
}
interface IStates {
  pdf:any,
  page:number,
  style:object
}
export default class WebPDF extends React.Component<IProps, IStates> {
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
      const { url,data } = this.props;
      if(url){
        //fetch pdf and render
        pdfjsLib.getDocument({ url }).then((pdf)=>{
          this.setState({ pdf },()=>{
            this.renderPage();
          });
        })
      }else{
        //loaded the base64
        const loadingTask = pdfjsLib.getDocument({data});
        loadingTask.promise.then((pdf)=>{
          this.setState({ pdf },()=>{
            this.renderPage();
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
      if(nextProps.page!==this.state.page){
         this.renderPage();
      }
      return true
    }
    private renderPage=()=>{
      const { pdf } = this.state;
      pdf.getPage(this.state.page).then((page) => {
        let desiredWidth = 375;
        let viewport = page.getViewport(1);
        let scale = desiredWidth / viewport.width;
        const viewport = page.getViewport(scale);
        const canvas = this.canvas.current;
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
    public render():JSX.Element {
        const { style } = this.state;
        return (
           <div style={style} className={styles["pdf__container"]}>
             <canvas ref={this.canvas}/>
           </div>
        );
    }
}
