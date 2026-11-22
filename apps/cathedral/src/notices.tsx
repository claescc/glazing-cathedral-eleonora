import {createRoot, type Root} from 'react-dom/client';
import {Notice, type NoticeKind, type NoticeProps} from '@complexity-nexus/ui';
declare const __UI_STYLE_VERSION__: string;
const source = (document.currentScript as HTMLScriptElement).src;
const stylesheet = new URL(`assets/design-system/notice.css?v=${__UI_STYLE_VERSION__}`, source).href;
const kinds = new Set(['info','error','success','warning','confirmation']);
class CathedralNotice extends HTMLElement {
  private reactRoot?: Root;
  connectedCallback() {
    if (this.reactRoot) return;
    for (const [attribute, maximum] of Object.entries({heading:20,message:80,'action-label':20})) {
      if (Array.from(this.getAttribute(attribute)||'').length > maximum) {
        this.dataset.noticeInvalid = attribute;
        this.dispatchEvent(new CustomEvent('notice-invalid',{bubbles:true,detail:{attribute,maximum}}));
        console.error(`Notification ${attribute} exceeds ${maximum} characters. Supply shorter copy.`);
        return;
      }
    }
    const root = this.shadowRoot || this.attachShadow({mode:'open'});
    const style = document.createElement('link'); style.rel='stylesheet'; style.href=stylesheet;
    const mount = document.createElement('div'); mount.style.display='contents';
    root.replaceChildren(style,mount);
    const kind = (kinds.has(this.getAttribute('kind')||'') ? this.getAttribute('kind') : 'info') as NoticeKind;
    const presentation = this.getAttribute('presentation') || 'alert';
    if (!['label','card','alert'].includes(presentation)) return;
    this.dataset.uiRuntime='react-tailwind';
    this.reactRoot=createRoot(mount);
    const render = () => this.reactRoot?.render(<Notice kind={kind} presentation={presentation as NoticeProps['presentation']} title={this.getAttribute('heading') || kind} message={this.getAttribute('message')||''} actionLabel={this.getAttribute('action-label')||undefined} openOnce={this.hasAttribute('open-once')} dismissible={this.hasAttribute('dismissible')} announce={this.hasAttribute('announce')} onDismiss={()=>{this.hidden=true;this.dispatchEvent(new CustomEvent('notice-dismiss',{bubbles:true,detail:{kind}}));}} onAction={()=>this.dispatchEvent(new CustomEvent('notice-action',{bubbles:true,detail:{kind}}))}/>);
    style.addEventListener('load', render, {once:true});
    if(style.sheet) render();
  }
  disconnectedCallback() {this.reactRoot?.unmount();this.reactRoot=undefined;}
}
if(!customElements.get('cathedral-notice'))customElements.define('cathedral-notice',CathedralNotice);
