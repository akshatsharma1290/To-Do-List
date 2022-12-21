const create_btn = document.querySelector(".create-btn")
const def_task = document.querySelector(".define-task")
const task_list = document.querySelector(".task-list")
const d_modal = document.querySelector(".del-modal")
const modal_yes = document.querySelector(".yes")
const modal_no = document.querySelector(".no")
let acc_title
let acc_body
let edit
let del
let start_date
let end_date
let title_inp
let save_btn
let task_area
let task_details

let getDate;
let a = 1

const acc_html = () => {

  return `    <div class="accordion mt-2 mb-2 acc${a - 1}" id="accordionExample">
  <i class="fa-solid fa-pen-to-square text-primary icon-1 icon "  data-index="${a - 1}" data-count="${a}"  ></i>
<i class="fa-sharp fa-solid fa-trash text-danger icon-2 icon" data-index="${a - 1}" data-count="${a}" ></i>
<div class="accordion-item">
  <h2 class="accordion-header" id="heading${a}">
  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${a}" aria-expanded="true" aria-controls="collapse${a}">
  <p class="acctitle${a - 1}">${task_details.title}<p>
    </button>
  </h2>
  <div id="collapse${a}" class="accordion-collapse collapse " aria-labelledby="heading${a}" data-bs-parent="#accordionExample">
    <div class="accordion-body">
     <p class="accbody${a - 1}">${task_details.task_text}<p>
    </div>
    </div>
    </div>`
}
const today_date = () => {
  getDate = new Date()
  return `${getDate.getMonth()} / ${getDate.getDate()} / ${getDate.getFullYear()}`

}
const inputHtml = () => {
  start_date = document.querySelector(".st-date")
  end_date = document.querySelector(".end-date")
  title_inp = document.querySelector(".title")
  task_area = document.querySelector(".task")
  start_date.value = today_date()
  title_inp.value = `Task ${a}`
  save_btn = document.querySelector(".save-btn")



}
const showTask = () => {
  document.querySelector(".heading").classList.remove("opacity-0")
  def_task.innerHTML = ""
  let c;
  for (let i = 1; i < Infinity; i++) {
    if (localStorage.getItem(`obj${a}`) != null) {
      task_details = JSON.parse(localStorage.getItem(`obj${a}`))
      c = acc_html()
      break
    }
    a++

  }


  task_list.insertAdjacentHTML("beforeend", c)
  a++

}
const storeTask = () => {
  let obj = new Object()
  obj = {
    st_date: start_date.value,
    en_date: end_date.value,
    title: title_inp.value,
    task_text: task_area.value

  }

  localStorage.setItem(`obj${a}`, JSON.stringify(obj))
  showTask()


}


const create_task = () => {
  def_task.innerHTML = `
<div class="input-group justify-content-center  inp-1 mb-3">
      <span class="input-group-text">Start-Date</span>
    <input type="text" class="form-control st-date"  aria-label="Username">
    <span class="input-group-text">End-Date</span>
    <input type="date" class="form-control end-date" placeholder="Server" aria-label="Server">
  </div>

  <div class="input-group justify-content-center  inp-2 mb-3">
      <span class="input-group-text ">Title</span>
    <input type="text" class="form-control title " aria-label="Username">
  </div>

  <div class="input-group inp-3 justify-content-center">
    <span class="input-group-text">Task</span>
    <textarea class="form-control task" placeholder="Enter your Task Here" aria-label="task"></textarea>
    </div>
    
    <div class="end-part text-center mt-3">
    <button type="button" class="save-btn btn btn-dark btn-lg ">Save Task</button>
    </div>
    `
  inputHtml()
  save_btn.addEventListener("click", storeTask)
  save_btn.addEventListener("click", deleteFunc)
  save_btn.addEventListener("click", editFunc)

}
create_btn.addEventListener("click", create_task)


const deleteFunc = () => {
  del = Array.from(document.querySelectorAll(".icon-2"))

  del.forEach((e) => {
    e.addEventListener("click", () => {
      let del_index = e.dataset.index
      let del_count = e.dataset.count
      d_modal.showModal()
      modal_yes.addEventListener("click", () => {

        localStorage.removeItem(`obj${del_count}`)
        try {
          document.querySelector(`.acc${del_index}`).remove()

        } catch (error) {
          "unwanted error"
        }
        d_modal.close()
        if (localStorage.length == 0) {
          location.reload()
        }

      })
      modal_no.addEventListener("click", () => {
        d_modal.close()
      })




    })
  })


}


const editFunc = () => {
  edit = Array.from(document.querySelectorAll(".icon-1"))

  edit.forEach((e) => {
    e.addEventListener("click", () => {
      let ed_index = e.dataset.index
      let ed_count = e.dataset.count

      let objEditable = JSON.parse(localStorage.getItem(`obj${ed_count}`))

      def_task.innerHTML = `
      <div class="input-group justify-content-center  inp-1 mb-3">
            <span class="input-group-text">Start-Date</span>
          <input type="text" class="form-control st-date"  aria-label="Username">
          <span class="input-group-text">End-Date</span>
          <input type="date" class="form-control end-date" placeholder="Server" aria-label="Server">
        </div>
      
        <div class="input-group justify-content-center  inp-2 mb-3">
            <span class="input-group-text ">Title</span>
          <input type="text" class="form-control title " aria-label="Username">
        </div>
      
        <div class="input-group inp-3 justify-content-center">
          <span class="input-group-text">Task</span>
          <textarea class="form-control task" placeholder="Enter your Task Here" aria-label="task"></textarea>
          </div>
      
          <div class="end-part text-center mt-3">
          <button type="button" class="save-btn btn btn-dark btn-lg ">Update Task</button>
          </div>
      `
      inputHtml()

      start_date.value = objEditable.st_date
      end_date.value = objEditable.en_date
      title_inp.value = objEditable.title
      task_area.value = objEditable.task_text

      save_btn.addEventListener("click", () => {

        let obj = new Object()
        obj = {
          st_date: start_date.value,
          en_date: end_date.value,
          title: title_inp.value,
          task_text: task_area.value
        }

        localStorage.setItem(`obj${ed_count}`, JSON.stringify(obj))
        def_task.innerHTML = ""
        document.querySelector(`.acctitle${ed_index}`).textContent = title_inp.value
        document.querySelector(`.accbody${ed_index}`).textContent = task_area.value


      })


    })
  })
}


if (localStorage.length > 0) {

  for (let i = 0; i < localStorage.length; i++) {
    showTask()
  }
  deleteFunc()
  editFunc()

}