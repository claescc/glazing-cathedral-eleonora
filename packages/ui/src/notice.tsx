'use client';
import {useEffect, useId, useRef} from 'react';
import {Button} from './button';
export type NoticeKind = 'info' | 'error' | 'success' | 'warning' | 'confirmation';
export type NoticeProps = {kind: NoticeKind; presentation: 'label'|'card'|'alert'; title: string; message: string; actionLabel?: string; openOnce?: boolean; dismissible?: boolean; announce?: boolean; onDismiss: ()=>void; onAction: ()=>void};
const paths: Record<NoticeKind, string> = {success:'M18 33 L28 43 L47 23',error:'M22 22 L42 42 M42 22 L22 42',info:'M32 29 L32 44 M32 20 L32 21',warning:'M32 22 L32 36 M32 44 L32 45',confirmation:'M24 24 C24 14 43 14 43 25 C43 33 32 31 32 39 M32 46 L32 47'};
function Icon({kind}: {kind: NoticeKind}) {
  return <span className="cnx-icon shrink-0" aria-hidden="true"><svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="32" cy="32" r="29"/><path d={paths[kind]}/></svg></span>;
}
export function Notice({kind, presentation, title, message, actionLabel, openOnce, dismissible, announce, onDismiss, onAction}: NoticeProps) {
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (presentation !== 'label' || !openOnce) return;
    let seen = false;
    try {seen = sessionStorage.getItem('cathedral-construction-seen') === 'yes';} catch {}
    if (!seen) {
      dialog.current?.showModal();
      try {sessionStorage.setItem('cathedral-construction-seen', 'yes');} catch {}
    }
  }, [presentation, openOnce]);
  const icon = <Icon kind={kind}/>;
  if (presentation === 'label') return <>
    <div className="cnx-label-group" data-ui-component="notice-label">
      <Button className={`cnx-label cnx-${kind}`} aria-haspopup="dialog" onClick={()=>dialog.current?.showModal()}>{icon}{title}</Button>
      {dismissible && <Button className={`cnx-label-dismiss cnx-${kind} inline-flex items-center justify-center`} aria-label={`Dismiss ${title}`} onClick={onDismiss}>×</Button>}
    </div>
    <dialog ref={dialog} className={`cnx-notice cnx-${kind} cnx-card`} data-ui-component="notice-dialog" aria-labelledby={id} aria-describedby={`${id}-message`}>
      <div className="cnx-colour-header flex flex-col items-center text-center">{icon}<h2 className="cnx-heading" id={id}>{title}</h2></div>
      <div className="cnx-body flex min-w-0 flex-col items-center"><p className="cnx-message" id={`${id}-message`}>{message}</p><Button className="cnx-action" onClick={()=>dialog.current?.close()}>{actionLabel || 'Close'}</Button></div>
    </dialog>
  </>;
  return <section className={`cnx-notice cnx-${kind} cnx-${presentation}`} data-ui-component="notice" role={announce ? kind==='error' ? 'alert' : 'status' : undefined}>
    {presentation==='card' ? <div className="cnx-colour-header">{icon}<strong className="cnx-heading">{title}</strong></div> : icon}
    <div className="cnx-body min-w-0">{presentation!=='card' && <strong className="cnx-heading">{title}</strong>}{message && <p className="cnx-message">{message}</p>}{presentation==='card' && <Button className="cnx-action" onClick={()=>{onAction();onDismiss();}}>{actionLabel || 'Close'}</Button>}</div>
    {dismissible && <Button className="cnx-close" aria-label={`Dismiss ${title}`} onClick={onDismiss}>×</Button>}
  </section>;
}
