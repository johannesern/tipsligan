export default function CreateFile(users, typeOfGame) {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const modifiedData = users.flatMap((user) => {
        return 'E,' + user.coupon;
    });

    const csvContent = typeOfGame + '\n' + modifiedData.join('\n'); // Add typeOfGame at the beginning

    const blob = new Blob([csvContent], { type: 'text/plain' });

    // Create a download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "tipsligan" + year + month + day + ".txt";
    link.click();
}