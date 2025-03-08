type TitleProps = {
    title: string;
    size: number;
}




const Title = (props: TitleProps) => {
    const checkSize = () => {
        switch (props.size) {
            case 1:
                return "text-4xl font-extrabold tracking-tight text-blue-700"
            case 2:
                return "text-3xl font-extrabold tracking-tight text-blue-700"
            case 3:
                return "text-2xl font-extrabold tracking-tight text-blue-700"
            case 4:
                return "text-1xl font-extrabold tracking-tight text-blue-700"
            default:
                return "text-4xl font-extrabold tracking-tigh text-blue-700t"
        }
    }


    return (
        <div className="pt-2 pb-3">
            <h1 className={checkSize()}>
                {props.title}
            </h1>
        </div >
    );
};

export default Title;
