/**
 * @file mofron-event-doubleclick/index.js
 * @brief event module template for developper
 * @license MIT
 */
module.exports = class extends mofron.class.Event {
    /**
     * initialize event
     * 
     * @param (mixed) short-form parameter
     *                key-value: event config
     * @short
     * @type private
     */
    constructor (prm) {
        try {
            super();
            this.modname("DoubleClick");
            this.confmng().add('last_click', { type:'number', init:0 });
            
	    if (undefined !== prm) {
                this.config(prm);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    contents (tgt_dom) {
        try {
            let evt_obj = this;
            tgt_dom.getRawDom().addEventListener(
                'click',
                (e) => {
                    try {
                        //evt_obj.execListener(e);
			evt_obj.clicked(tgt_dom.component(), e, evt_obj);
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                },
                false
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    clicked (c1,c2,c3) {
        try {
	    let now_tm = new Date().getTime();
	    if (200 > (now_tm - c3.confmng("last_click"))) {
                c3.execListener(c2);
	    }
	    c3.confmng("last_click", now_tm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
