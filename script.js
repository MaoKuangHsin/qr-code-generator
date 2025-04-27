
let qrCode;

const generateBtn = document.getElementById('generate-btn');
const downloadBtn = document.getElementById('download-btn');

generateBtn.addEventListener('click', () => {
    const text = document.getElementById('text-input').value;
    const darkColor = document.getElementById('dark-color').value;
    const lightColor = document.getElementById('light-color').value;
    const logoInput = document.getElementById('logo-upload');

    if (!text.trim()) {
        alert("Please enter text or URL");
        return;
    }

    
    if (qrCode) {
        document.getElementById('qrcode').innerHTML = '';
    }

    qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        data: text,
        image: "",
        dotsOptions: {
            color: darkColor,
            type: "rounded"
        },
        backgroundOptions: {
            color: lightColor,
        },
        imageOptions: {
            crossOrigin: "anonymous",
            margin: 20
        }
    });

    if (logoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            qrCode.update({ image: e.target.result });
            qrCode.append(document.getElementById('qrcode'));
            downloadBtn.style.display = "inline-block";
        };
        reader.readAsDataURL(logoInput.files[0]);
    } else {
        qrCode.append(document.getElementById('qrcode'));
        downloadBtn.style.display = "inline-block";
    }
});

downloadBtn.addEventListener('click', () => {
    if (qrCode) {
        qrCode.download({ name: "qr-code", extension: "png" });
    }
});
