

let value: string | number | null = localStorage.getItem("value");
if (value != null) {
    value = Number(value);
    value++;
} else {
    value = 1;
}
localStorage.setItem("value", String(value));
console.log(value);