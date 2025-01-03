(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const u of l.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&c(u)}).observe(document,{childList:!0,subtree:!0});function i(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function c(o){if(o.ep)return;o.ep=!0;const l=i(o);fetch(o.href,l)}})();const n=[];for(let e=0;e<256;++e)n.push((e+256).toString(16).slice(1));function L(e,t=0){return(n[e[t+0]]+n[e[t+1]]+n[e[t+2]]+n[e[t+3]]+"-"+n[e[t+4]]+n[e[t+5]]+"-"+n[e[t+6]]+n[e[t+7]]+"-"+n[e[t+8]]+n[e[t+9]]+"-"+n[e[t+10]]+n[e[t+11]]+n[e[t+12]]+n[e[t+13]]+n[e[t+14]]+n[e[t+15]]).toLowerCase()}let b;const v=new Uint8Array(16);function C(){if(!b){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");b=crypto.getRandomValues.bind(crypto)}return b(v)}const S=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),T={randomUUID:S};function E(e,t,i){if(T.randomUUID&&!t&&!e)return T.randomUUID();e=e||{};const c=e.random||(e.rng||C)();return c[6]=c[6]&15|64,c[8]=c[8]&63|128,L(c)}class A{constructor(t){this.id=E(),this.description=t,this.done=!1,this.createdAt=new Date}}const a={All:"all",Completed:"Completed",Pending:"Pending"},s={todos:[],filter:a.All},P=()=>{w(),console.log("InitStore")},w=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=a.All}=JSON.parse(localStorage.getItem("state"));s.todos=e,s.filter=t},h=()=>{localStorage.setItem("state",JSON.stringify(s))},I=(e=a.All)=>{switch(e){case a.All:return[...s.todos];case a.Completed:return s.todos.filter(t=>t.done);case a.Pending:return s.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid.`)}},k=e=>{if(!e)throw new Error("Description is required");s.todos.push(new A(e)),h()},U=e=>{s.todos=s.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),h()},x=e=>{s.todos=s.todos.filter(t=>t.id!==e),h()},D=()=>{s.todos=s.todos.filter(e=>!e.done),h()},O=(e=a.All)=>{s.filter=e,h()},q=()=>s.filter,d={initStore:P,loadStore:w,addTodo:k,toggleTodo:U,deleteTodo:x,deleteCompleted:D,setFilter:O,getCurrentFilter:q,getTodos:I},F=`<section class="todoapp">\r
    <header class="header">\r
        <h1>Tareas</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="Lista de Tareas" autofocus>\r
    </header>\r
    \r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="todo-list">\r
            <!-- These are here just to show the structure of the list items -->\r
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
            <!-- <li class="completed" data-id="abc">\r
                <div class="view">\r
                    <input class="toggle" type="checkbox" checked>\r
                    <label>Probar JavaScript</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Create a TodoMVC template">\r
            </li> -->\r
            <!-- <li>\r
                <div class="view">\r
                    <input class="toggle" type="checkbox">\r
                    <label>Comprar un unicornio</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Rule the web">\r
            </li> -->\r
        </ul>\r
    </section>\r
\r
    <!-- This footer should hidden by default and shown when there are todos -->\r
    <footer class="footer">\r
        <!-- This should be "0 items left" by default -->\r
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        <!-- Remove this if you don't implement routing -->\r
        <ul class="filters">\r
            <li>\r
                <a class="filtro" class="selected" href="#/">Todos</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/active">Pendientes</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/completed">Completados</a>\r
                <br>\r
            </li>\r
        </ul>\r
        <!-- Hidden if no completed items are left ↓ -->\r
        <button class="clear-completed">Borrar completados</button>\r
    </footer>\r
</section>\r
\r
\r
<footer class="info">\r
    <p>Template Editado por Santiago Carrillo</></p>\r
    <!-- Change this out with your name and url ↓ -->\r
</footer>`,M=e=>{if(!e)throw new Error("A TODO object is required");const t=`
                <div class="view">
                    <input class="toggle" type="checkbox" ${e.done?"checked":""}>
                    <label>${e.description}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">
            
            `,i=document.createElement("li");return i.innerHTML=t,i.setAttribute("data-id",e.id),e.done&&i.classList.add("completed"),i};let g;const N=(e,t=[])=>{if(g||(g=document.querySelector(e)),!g)throw new Error(`Element ${e} not found`);g.innerHTML="",t.forEach(i=>{g.append(M(i))})};let y;const H=e=>{if(y||(y=document.querySelector(e)),!y)throw new Error(`Element ${e} not found`);y.innerHTML=d.getTodos(a.Pending).length},m={TodoList:".todo-list",NewTodoInput:"#new-todo-input",ClearCompleted:".clear-completed",TodoFilters:".filtro",PendingCountLabel:"#pending-count"},R=e=>{const t=()=>{const r=d.getTodos(d.getCurrentFilter());N(m.TodoList,r),i()},i=()=>{H(m.PendingCountLabel)};(()=>{const r=document.createElement("div");r.innerHTML=F,document.querySelector(e).append(r),t()})();const c=document.querySelector(m.NewTodoInput),o=document.querySelector(m.TodoList),l=document.querySelector(m.ClearCompleted),u=document.querySelectorAll(m.TodoFilters);c.addEventListener("keyup",r=>{r.keyCode===13&&r.target.value.trim().length!==0&&(d.addTodo(r.target.value),t(),r.target.value="")}),o.addEventListener("click",r=>{const p=r.target.closest("[data-id]");d.toggleTodo(p.getAttribute("data-id")),t()}),o.addEventListener("click",r=>{const p=r.target.className==="destroy",f=r.target.closest("[data-id]");!f||!p||(d.deleteTodo(f.getAttribute("data-id")),t())}),l.addEventListener("click",()=>{d.deleteCompleted(),t()}),u.forEach(r=>{r.addEventListener("click",p=>{switch(u.forEach(f=>f.classList.remove("selected")),p.target.classList.add("selected"),p.target.text){case"Todos":d.setFilter(a.All);break;case"Pendientes":d.setFilter(a.Pending);break;case"Completados":d.setFilter(a.Completed);break}t()})})};d.initStore();R("#app");
