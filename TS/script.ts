const url: string = 'https://api.thecatapi.com/v1/images/search'
console.log(url);
const button: HTMLButtonElement | null= document.querySelector('button')
const tableBody: HTMLTableElement | null = document.querySelector('#table-body')
interface CatType {
    id: string,
    url: string,
    width: number,
    height: number,
    test?: string

}
class Cat implements CatType{
    id: string
    url: string
    width: number
    height: number
    constructor(id: string, url: string, width: number,height: number) {
        this.id = id
        this.url = url
        this.width = width
        this.height = height
    }
}

class WebDisplay{
    public static addData(data: CatType): void {
        const cat = new Cat(data.id, data.url, data.width, data.height)
        const tableRow: HTMLTableRowElement = document.createElement('tr')
        tableRow.innerHTML = `
        <td>${cat.id}</td>
        <td>
            <img src="${cat.url}" alt="喵">
        </td>
        <td>${cat.width.toString()}</td>
        <td>${cat.height.toString()}</td>
        <td>${cat.url}</td>
        <td>
            <a href="#">X</a>
        </td>
        `
        tableBody?.appendChild(tableRow)
    }
    public static deleteData(deleteButton: HTMLAnchorElement) {
        const td = deleteButton.parentElement as HTMLTableCellElement
        const tr = td.parentElement as HTMLTableRowElement
        tr.remove()

    }
}

async function getJSON<T>(url: string): Promise<T> {
    const response: Response = await fetch(url)
    console.log('response', response);
    const json: Promise<T> = await response.json()
    console.log('response', json);
    return json
}


async function getData(): Promise<void> {
    try {
        const json: CatType[] = await getJSON<CatType[]>(url)
        const data: CatType = json[0]
        WebDisplay.addData(data)
    } catch (error: Error | unknown) {
        let message: string
        if(error instanceof Error){
            message = error.message
        } else {
            message = String(error)
        }
        console.log(error);
    }
}
button?.addEventListener<'click'> ('click', getData)
tableBody?.addEventListener<'click'>('click', (ev: MouseEvent) => {
    if(ev.target instanceof HTMLAnchorElement) {
        // 判断点击的是a才执行删除操作
        WebDisplay.deleteData(<HTMLAnchorElement>ev.target);
    }
   
});