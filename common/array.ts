

function startsWith(str:string, m:string) {
    return str.indexOf(m) == 0;
};

function endsWith(str:string,suffix:string) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

export function logicChange(arr: string[], change: string) {

    let ret = arr.slice(0);
    if (change) {
        var actions = change.split(' ');

        actions.forEach((it) => {
            if (it && startsWith(it,'+')) {
                ret.push(it.substr(1));
            }
            else if (it && startsWith(it,'-')) {
                if (endsWith(it,'*')) {
                    let m = it.substr(1, it.length - 2);
                    console.log('m1',m)
                    ret = ret.filter(item => !startsWith(item,m));
                } else {
                    let m = it.substr(1);
                    console.log('m2',m)
                    ret = ret.filter(item => item != m);
                }
            }
        });
    }
    return ret;
}