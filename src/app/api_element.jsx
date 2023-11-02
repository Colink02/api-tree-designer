
export class ApiElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            api: props.api,
            x: props.x,
            y: props.y,
            width: props.width,
            height: props.height,
            title: props.title,
            description: props.description,
            id: props.id,
            selected: false
        };
    }

    componentDidMount() {
        this.dragElement(document.getElementById(this.state.id));
    }

    dragElement(elmnt) {
        var pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;
            console.log(elmnt);
    }
}