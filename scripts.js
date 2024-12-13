const { createApp } = Vue;

        createApp({
            data() {
                return {
                    email: '',
                    password: '',
                    isLoggedIn: false,
                    chart: null,
                    loginMessage: '',
                    loginMessageClass: '',
                    selectedGraphType: 'line',
                };
            },
            created() {
                const storedLoginStatus = localStorage.getItem('isLoggedIn');
                const storedGraphType = localStorage.getItem('selectedGraphType');

                if (storedLoginStatus === 'true') {
                    this.isLoggedIn = true;
                    if (storedGraphType) {
                        this.selectedGraphType = storedGraphType;
                    }
                    this.$nextTick(() => {
                        this.showGraph();
                    });
                }
            },
            methods: {
                handleLogin() {
                    if (this.email === 'szenwei0303@gmail.com' && this.password === 'test123456') {
                        this.isLoggedIn = true;
                        localStorage.setItem('isLoggedIn', 'true');
                        localStorage.setItem('selectedGraphType', this.selectedGraphType);
                        this.$nextTick(() => {
                            this.showGraph();
                        });
                    } else {
                        this.loginMessage = 'Incorrect email or password.';
                        this.loginMessageClass = 'aclGraphErrorMessage';
                    }
                },
                handleLogout() {
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('selectedGraphType');
                    this.isLoggedIn = false;
                    this.loginMessage = 'You have been logged out.';
                    this.loginMessageClass = 'aclGraphSuccessMessage';
                    if (this.chart) {
                        this.chart.destroy();
                        this.chart = null;
                    }
                },
                showGraph() {
                    const data = {
                        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                        datasets: [{
                            data: [65, 59, 80, 81, 56, 55, 40],
                            backgroundColor: [
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(75, 192, 192, 1)',
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    };

                    const ctx = document.getElementById('myChart').getContext('2d');
                    if (this.chart) this.chart.destroy();
                    this.chart = new Chart(ctx, {
                        type: this.selectedGraphType,
                        data: data,
                        options: {
                            responsive: true,
                            plugins: {
                                legend: {
                                    display: false,
                                },
                            },
                            scales: {
                                x: {
                                    ticks: {
                                        color: '#ffffff',
                                    }
                                },
                                y: {
                                    ticks: {
                                        color: '#ffffff',
                                    }
                                }
                            }
                        }
                    });
                },
                updateGraph() {
                    localStorage.setItem('selectedGraphType', this.selectedGraphType);
                    this.showGraph();
                },
            },
        }).mount('#app');