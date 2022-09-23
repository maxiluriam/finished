export default function save(people: Array<any>) {
  localStorage.setItem("people", JSON.stringify(people));
}
