// Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            // Show the default tab on load
            openTab('calculus');
            
            // Check if there's a hash in the URL for direct article access
            const hash = window.location.hash.substr(1);
            if (hash && document.getElementById(hash)) {
                showArticle(hash);
            }
        });
        
        // Tab functionality
        function openTab(tabName) {
            // Show loading indicator
            document.getElementById('loader').style.display = 'block';
            
            // Hide all tab contents and articles
            const tabContents = document.getElementsByClassName('tab-content');
            for (let i = 0; i < tabContents.length; i++) {
                tabContents[i].classList.remove('active');
                tabContents[i].style.display = 'none';
            }
            
            const articles = document.getElementsByClassName('article-page');
            for (let i = 0; i < articles.length; i++) {
                articles[i].style.display = 'none';
            }
            
            // Update tab buttons
            const tabButtons = document.getElementsByClassName('tab-btn');
            for (let i = 0; i < tabButtons.length; i++) {
                tabButtons[i].classList.remove('active');
            }
            
            // Show the selected tab
            document.getElementById(tabName).classList.add('active');
            document.getElementById(tabName).style.display = 'block';
            event.currentTarget.classList.add('active');
            
            // Update URL without page reload
            history.pushState({tab: tabName}, null, '#');
            
            // Hide loading indicator after a short delay (simulate loading)
            setTimeout(function() {
                document.getElementById('loader').style.display = 'none';
            }, 300);
        }
        
        // Article display functionality
        function showArticle(articleId) {
            // Show loading indicator
            document.getElementById('loader').style.display = 'block';
            
            // Hide all tab contents
            const tabContents = document.getElementsByClassName('tab-content');
            for (let i = 0; i < tabContents.length; i++) {
                tabContents[i].style.display = 'none';
            }
            
            // Hide all articles
            const articles = document.getElementsByClassName('article-page');
            for (let i = 0; i < articles.length; i++) {
                articles[i].style.display = 'none';
            }
            
            // Show the requested article
            document.getElementById(articleId).style.display = 'block';
            
            // Update URL
            history.pushState({article: articleId}, null, '#' + articleId);
            
            // Scroll to the top smoothly
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Hide loading indicator after a short delay
            setTimeout(function() {
                document.getElementById('loader').style.display = 'none';
            }, 300);
        }
        
        function hideArticle() {
            // Show loading indicator
            document.getElementById('loader').style.display = 'block';
            
            // Show the active tab content
            const activeTab = document.querySelector('.tab-content.active');
            if (activeTab) {
                activeTab.style.display = 'block';
            }
            
            // Hide all articles
            const articles = document.getElementsByClassName('article-page');
            for (let i = 0; i < articles.length; i++) {
                articles[i].style.display = 'none';
            }
            
            // Update URL
            history.pushState({tab: activeTab ? activeTab.id : 'calculus'}, null, '#');
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Hide loading indicator
            setTimeout(function() {
                document.getElementById('loader').style.display = 'none';
            }, 300);
        }
        
        // Handle back/forward navigation
        window.addEventListener('popstate', function(event) {
            const hash = window.location.hash.substr(1);
            if (hash && document.getElementById(hash)) {
                showArticle(hash);
            } else {
                // Restore the appropriate tab
                const tabName = event.state && event.state.tab ? event.state.tab : 'calculus';
                const tabButton = document.querySelector(`.tab-btn[onclick="openTab('${tabName}')"`);
                if (tabButton) {
                    tabButton.click();
                }
            }
        });
        
        // Search functionality
        function filterArticles(tab) {
            const input = document.querySelector(`#${tab} .search-input`);
            const filter = input.value.toUpperCase();
            const articlesContainer = document.getElementById(`${tab}-articles`);
            const articles = articlesContainer.getElementsByClassName('article-card');
            
            for (let i = 0; i < articles.length; i++) {
                const title = articles[i].querySelector('.article-content h3').textContent;
                const description = articles[i].querySelector('.article-content p').textContent;
                
                if (title.toUpperCase().indexOf(filter) > -1 || description.toUpperCase().indexOf(filter) > -1) {
                    articles[i].style.display = "";
                } else {
                    articles[i].style.display = "none";
                }
            }
        }
        
        // Add click effect to all buttons
        document.querySelectorAll('.btn, .tab-btn, .back-btn, nav a, .footer-links a').forEach(button => {
            button.addEventListener('mousedown', function() {
                this.style.transform = 'translateY(2px)';
            });
            button.addEventListener('mouseup', function() {
                this.style.transform = 'translateY(0)';
            });
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });