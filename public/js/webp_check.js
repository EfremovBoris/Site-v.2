// Simple function to check webp support 
// Hope it's enough for now

function support_webp()
{
    var elem = document.createElement('canvas');
    if (!!(elem.getContext && elem.getContext('2d')))
    {return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;} else {return false;}
}

var root = document.documentElement;
if (support_webp() === true) {root.classList.add('webp');} else {root.classList.add('no-webp');}