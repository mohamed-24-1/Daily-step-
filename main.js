const $ = id => document.getElementById(id);
const get = k => JSON.parse(localStorage.getItem(k));
const set = (k,v) => localStorage.setItem(k, JSON.stringify(v));

/* SIGNUP */
window.signup = () => {
  const name = $("suName")?.value.trim();
  if(!name) return alert("Enter your name");
  if(!/^[a-zA-Z\s]+$/.test(name)) return alert("Name letters only");
  set("user", name); set("goal",0); set("steps",0); set("history",[]);
  location.href="login.html";
};

/* LOGIN */
window.login = () => {
  const name = $("liName")?.value.trim();
  if(!name) return alert("Enter name");
  if(name !== get("user")) return alert("User not found");
  location.href="tracker.html";
};

/* TRACKER */
window.loadTracker = () => {
  const goal = get("goal")||0, steps = get("steps")||0;
  if($("goalText")) $("goalText").innerText=goal;
  if($("stepText")) $("stepText").innerText=steps;
  if($("progress")) $("progress").innerText=`${Math.min(steps,goal)} / ${goal}`;
  if($("progressFill")) $("progressFill").style.width = goal?Math.min((steps/goal)*100,100)+"%":"0%";
};

window.setGoal = () => {
  const goal= +$("goalInput")?.value;
  if(!goal||goal<=0) return alert("Invalid goal");
  set("goal",goal); set("steps",0); set("history",[]); loadTracker();
};

window.addSteps = () => {
  const add = +$("stepInput")?.value, goal = get("goal")||0;
  let steps = get("steps")||0;
  if(goal===0) return alert("Set goal first");
  if(!add||add<=0) return alert("Enter valid steps");
  if(steps+add>goal) return alert("Cannot exceed goal");
  steps+=add; set("steps",steps);
  const history=get("history")||[];
  history.push({date:new Date().toLocaleDateString(),steps:add});
  set("history",history);
  loadTracker();
};

/* HISTORY */
window.loadHistory = () => {
  const list=$("historyList"), history=get("history")||[];
  if(!list) return;
  list.innerHTML="";
  history.forEach(h=>{
    const li=document.createElement("li");
    li.textContent=`${h.date}: +${h.steps} steps`;
    list.appendChild(li);
  });
};

/* TIPS */
window.loadTips = () => {
  const tips = [
    "Take a short walk after meals",
    "Use stairs instead of elevator",
    "Track your steps daily",
    "Drink water to stay hydrated",
    "Walk with friends for motivation"
  ];
  const list=$("tipsList"); if(!list) return;
  list.innerHTML="";
  tips.forEach(t=>{const li=document.createElement("li");li.textContent=t;list.appendChild(li);});
};

/* CONTACT */
window.sendContact = () => {
  const name=$("contactName")?.value.trim(), phone=$("contactPhone")?.value.trim();
  const email=$("contactEmail")?.value.trim(), msg=$("contactMsg")?.value.trim();
  if(!name||!phone||!email||!msg) return alert("Fill all fields");
  if(!/^[a-zA-Z\s]+$/.test(name)) return alert("Name letters only");
  if(!/^[0-9]+$/.test(phone)) return alert("Phone numbers only");
  alert("Message sent! Thank you.");
  $("contactName").value=""; $("contactPhone").value=""; $("contactEmail").value=""; $("contactMsg").value="";
};

/* AUTO INIT */
window.onload = ()=>{
  if($("progress")||$("goalText")) loadTracker();
  if($("historyList")) loadHistory();
  if($("tipsList")) loadTips();
};
