import './KeyData.css'

const KeyData = ({ name, value, img }) => {
    return (
        // Todo : la virgule pour les "1,000 kCal"
        <div className="keydata">
            <img src={img} alt={name} />
            <div>
                <p className="value">{value}</p>
                <p className="type">{name}</p>
            </div>
        </div>
    )
}

export default KeyData
