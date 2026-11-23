import {Button} from './button';
export type PageNavigationProps = {idPrefix: string; pageLabel?: string};
/** Static or interactive consumers can attach their own pagination state and handlers. */
export function PageNavigation({idPrefix, pageLabel='Page'}: PageNavigationProps) {
  return <div className="cnx-page-navigation grid grid-cols-2" role="navigation" aria-label="Source page navigation" data-ui-component="page-navigation">
    <Button id={`${idPrefix}Prev`} className="cnx-page-navigation-button" aria-label="Previous page">← Previous</Button>
    <label className="cnx-page-navigation-number">{pageLabel}<input id={`${idPrefix}PageNumber`} type="number" min="1" className="cnx-page-navigation-input"/></label>
    <Button id={`${idPrefix}Next`} className="cnx-page-navigation-button" aria-label="Next page">Next →</Button>
  </div>;
}
