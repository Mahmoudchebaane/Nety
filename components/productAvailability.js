export const ProductAvailability = ({ quantity }) => {
    let message, icon,style;

    if (quantity === 0) {
        message = 'Produit non disponible';
        icon = 'bi-x-circle';
        style="red";
    } else if (quantity > 0 && quantity < 3) {
        message = 'Derniers articles en stock';
        icon = 'bi-exclamation-octagon-fill';
        style="gray";
    } else {
        message = 'En stock';
        icon = 'bi-check2-square';
        style="green";
    }

    return (
        <span className={`product-last-items ${style}`}>
            <i className={`bi ${icon}`} aria-hidden="true"></i>
            {message}
        </span>
    );
};