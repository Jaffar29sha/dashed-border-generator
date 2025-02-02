const Chrome = VueColor.Chrome

const LineCapStates = {
    Butt: 'butt',
    Round: 'round',
    Square: 'square'
}

let app = new Vue({
    el: '#app',
    components: {
        'chrome-picker': Chrome,
    },
    data: {
        colorPicker: {
            isOpened: false,
            borderColor: '#194d33',
            target: ''
        },
        currentStyle: {
            backgroundColor: 'transparent',
            borderColor: '#333',
            width: 4,
            dashArray: '6, 14',
            dashOffset: 0,
            borderRadius: 0,
            linecap: LineCapStates.Square,
        },
        styles: {
            style0: {
                backgroundColor: 'transparent',
                borderColor: 'black',
                width: 4,
                dashArray: '6, 14',
                dashOffset: 0,
                borderRadius: 0,
                linecap: LineCapStates.Square,
            },
            style1: {
                backgroundColor: '#2a87bd',
                borderColor: 'white',
                width: 7,
                dashArray: '6',
                dashOffset: 0,
                borderRadius: 20,
                linecap: LineCapStates.Butt,
            },
            style2: {
                backgroundColor: 'pink',
                borderColor: 'white',
                width: 15,
                dashArray: '6%',
                dashOffset: 0,
                borderRadius: 100,
                linecap: LineCapStates.Butt,
            },
            style3: {
                backgroundColor: 'transparent',
                borderColor: 'black',
                width: 10,
                dashArray: '15, 15, 1',
                dashOffset: 0,
                borderRadius: 0,
                linecap: LineCapStates.Square,
            },
            style4: {
                backgroundColor: 'lightblue',
                borderColor: 'black',
                width: 25,
                dashArray: '2, 6',
                dashOffset: 28,
                borderRadius: 0,
                linecap: LineCapStates.Butt,
            },
        },
        options: {
            linecap: LineCapStates
        },
    },
    computed: {
        output() {
            let str = ''
            let css = this.generateCSS(this.currentStyle)
            for(let key in css){
                if(!css.hasOwnProperty(key)) continue
                str += `${key}: ${css[key]};\n`
            }
            return str.substr(0, str.length-1) // remove last line break
        },
    },
    methods: {
        setStyle(style) {
            this.currentStyle = {...style}
        },
        generateCSS(style){
            let css = { }
            if(/^#[a-fA-f0-9]{6}FF$/.test(style.backgroundColor)) {
                css['background-color'] = style.backgroundColor.substr(0, 7)
            } else if(style.backgroundColor !== 'transparent' && !/^#[a-fA-f0-9]{6}00$/.test(style.backgroundColor)){
                css['background-color'] = style.backgroundColor
            }
            let svg = `<svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>` +
                `<rect width='100%' height='100%' fill='none' ` +
                (style.borderRadius > 0 ? `rx='${style.borderRadius}' ry='${style.borderRadius}' ` : '') +
                `stroke='${style.borderColor}' ` +
                `stroke-width='${style.width}' ` +
                `stroke-dasharray='${style.dashArray}' ` +
                `stroke-dashoffset='${style.dashOffset}' ` +
                `stroke-linecap='${style.linecap}'/></svg>`
            css['background-image'] = `url("${svgToTinyDataUri(svg)}")`
            if (style.borderRadius > 0) {
                css['border-radius'] = style.borderRadius + 'px'
            }
            return css
        },
        copyCss() {
            const el = this.$refs.codeInput;
            el.select();
            document.execCommand('copy');
        },
        /* ---------------------
         * Color Picker Methods
         * --------------------- */
        openColorPicker(target){
            this.colorPicker.borderColor = target === 'border' ? this.currentStyle.borderColor : this.currentStyle.backgroundColor
            this.colorPicker.target = target
            this.colorPicker.isOpened = true
        },
        closeColorPicker(){
            this.colorPicker.isOpened = false
            this.colorPicker.target = ''
        },
        updateColor(color){
            if(this.colorPicker.target === 'border') {
                this.currentStyle.borderColor = color.hex8
            } else {
                this.currentStyle.backgroundColor = color.hex8
            }
        }
    }
})
