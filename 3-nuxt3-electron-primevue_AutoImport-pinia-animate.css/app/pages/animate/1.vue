<template>
    <div class="container">
        <aside class="sidebar animate__animated animate__slideInLeft">
            <h1 class="animate__animated animate__bounce">Dashboard</h1>
            <ul>
                <li>Analytics</li>
                <li>Teams</li>
                <li>Documents</li>
                <li>Settings</li>
            </ul>
        </aside>
        <main class="main-content">
            <header class="animate__animated animate__fadeIn">
                <div class="greeting">
                    <h2>Hello, Jessica!</h2>
                    <p>You've got 8 tasks today</p>
                </div>
                <input type="text" placeholder="Search something...">
            </header>
            <section class="tasks">
                <h3 class="animate__animated animate__pulse animate__infinite">My tasks</h3>
                <div class="task animate__animated animate__fadeInUp">
                    <p>Make a landing page and mobile app..</p>
                    <div class="progress-bar">
                        <div class="progress" style="width: 35%;"></div>
                    </div>
                </div>
                <div class="task financial-app animate__animated animate__fadeInUp animate__delay-1s">
                    <p>Financial App</p>
                    <div class="progress-bar">
                        <div class="progress" style="width: 60%;"></div>
                    </div>
                </div>
            </section>
            <section class="calendar animate__animated animate__zoomIn animate__delay-2s">
                <h3>April 10, 2021</h3>
                <div class="today">
                    <h4>Today</h4>
                    <div class="event">
                        <span>Meeting</span> 
                        <span>9:00 AM</span>
                    </div>
                    <div class="event">
                        <span>Icon set</span>
                        <span>11:00 AM</span>
                    </div>
                </div>
                <button class="animate__animated animate__heartBeat animate__delay-3s">Add tasks</button>
            </section>
        </main>
    </div>
</template>

<script setup>
</script>

<style lang="scss">

/* Example using @keyframes approach for button hover effect */
button:hover {
    animation: pulse; /* Using animate.css keyframe */
    animation-duration: 3s;
}


* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
}

.container {
    display: flex;
    height: 100vh;
}

.sidebar {
    background-color: #2b2b2b;
    color: white;
    padding: 20px;
    width: 200px;
}

.sidebar h1 {
    font-size: 24px;
    margin-bottom: 20px;
}

.sidebar ul {
    list-style: none;
}

.sidebar li {
    margin: 15px 0;
    cursor: pointer;
}

.main-content {
    flex: 1;
    padding: 20px;
    background-color: white;
}

header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

header input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.tasks {
    margin-bottom: 20px;
}

.tasks h3 {
    margin-bottom: 10px;
}

.task {
    background-color: #f4f4f4;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
}

.progress-bar {
    background-color: #e0e0e0;
    border-radius: 5px;
    height: 10px;
    position: relative;
}

.progress {
    background-color: #ffcc00;
    height: 100%;
    border-radius: 5px;
}

.calendar {
    margin-bottom: 20px;
}

.calendar h3 {
    margin-bottom: 10px;
}

.event {
    display: flex;
    justify-content: space-between;
    background-color: #ffcc00;
    padding: 10px;
    border-radius: 5px;
    margin: 10px 0;
}

button {
    padding: 10px 20px;
    background-color: #ffcc00;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>