var osszes = 0;

function addToOsszes(value) {
    osszes += value;
}

function showTotal() {
    if (osszes === 0) {
        alert('Jelenleg még nincs termék a kosárban, kérem válassza ki a vásárolni kívánt terméket!');
    } else {
        var confirmation = confirm('Az ár: $' + osszes + '\nKívánja megvásárolni a termékeket?');

        if (confirmation) {
            var purchaseConfirmation = confirm('Sikeres vásárlás');
            if (purchaseConfirmation) {
                osszes = 0;
            }
        } else {
            alert('Törölt minden terméket');
            osszes = 0;
        }
    }
}

