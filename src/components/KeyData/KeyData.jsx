import './KeyData.css'

const KeyData = ({ name, value, img }) => {
    return (
        <div className="keydata">
            <img src={img} alt={name} />
            <div>
                <p>{value}</p>
                <p>{name}</p>
            </div>
        </div>
    )
}

export default KeyData
