import * as React from "react";
import * as CSSModules from "react-css-modules";
import * as styles from './index.less';
import * as pdfjsLib from 'pdfjs-dist';
// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.550/pdf.worker.js';

//atob() is used to convert base64 encoded PDF to binary-like data.
var pdfData = atob(
  'JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwog' +
  'IC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAv' +
  'TWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0K' +
  'Pj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAg' +
  'L1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+' +
  'PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9u' +
  'dAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2Jq' +
  'Cgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJU' +
  'CjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVu' +
  'ZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4g' +
  'CjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAw' +
  'MDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9v' +
  'dCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G');
interface IProps {
  url:string
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
      // show only one pdf page
      pdfjsLib.getDocument({
        url:this.props.url
      }).then((pdf)=>{
        this.setState({ pdf },function(){
           //render the pdf
           this.renderPage();
        });
      })
      // loaded the base64
      // const loadingTask = pdfjsLib.getDocument({data:pdfData});
      // loadingTask.promise.then((pdf)=>{
      //   this.setState({ pdf },()=>{
      //     this.renderPage();
      //   })
      // })
    }
    renderPage(){
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
        const {style}= this.state;
        return (
           <div style={style} className={styles["pdf__container"]}>
            <canvas ref={this.canvas}/>
           </div>
        );
    }
}
