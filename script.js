// GitHub username
const GITHUB_USERNAME = 'ArshadMQ';

// DOM Elements
const elements = {
    userName: document.getElementById('userName'),
    profileImage: document.getElementById('profileImage'),
    fullName: document.getElementById('fullName'),
    bio: document.getElementById('bio'),
    aboutText: document.getElementById('aboutText'),
    repoCount: document.getElementById('repoCount'),
    followerCount: document.getElementById('followerCount'),
    followingCount: document.getElementById('followingCount'),
    location: document.getElementById('location'),
    email: document.getElementById('email'),
    githubLink: document.getElementById('githubLink'),
    githubLink2: document.getElementById('githubLink2'),
    twitterLink: document.getElementById('twitterLink'),
    twitterLink2: document.getElementById('twitterLink2'),
    linkedinLink: document.getElementById('linkedinLink'),
    linkedinLink2: document.getElementById('linkedinLink2'),
    projectsContainer: document.getElementById('projectsContainer'),
    footerName: document.getElementById('footerName')
};

// Fetch GitHub Profile Data
async function fetchGitHubProfile() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        const data = await response.json();
        
        // Update profile information
        elements.userName.textContent = data.name || data.login;
        elements.profileImage.src = data.avatar_url;
        elements.fullName.textContent = data.name || data.login;
        elements.bio.textContent = data.bio || 'Software Developer';
        elements.aboutText.textContent = data.bio || 'Passionate software developer with a keen interest in creating innovative solutions.';
        elements.repoCount.textContent = data.public_repos;
        elements.followerCount.textContent = data.followers;
        elements.followingCount.textContent = data.following;
        elements.location.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${data.location || 'Location not specified'}`;
        elements.email.innerHTML = `<i class="fas fa-envelope"></i> ${data.email || 'Email not public'}`;
        elements.footerName.textContent = data.name || data.login;

        // Update social links
        const githubUrl = `https://github.com/${GITHUB_USERNAME}`;
        elements.githubLink.href = githubUrl;
        elements.githubLink2.href = githubUrl;

        if (data.twitter_username) {
            const twitterUrl = `https://twitter.com/${data.twitter_username}`;
            elements.twitterLink.href = twitterUrl;
            elements.twitterLink2.href = twitterUrl;
        } else {
            elements.twitterLink.style.display = 'none';
            elements.twitterLink2.style.display = 'none';
        }

        // For LinkedIn, you'll need to manually update this
        // elements.linkedinLink.href = 'Your LinkedIn URL';
        // elements.linkedinLink2.href = 'Your LinkedIn URL';

        // Fetch and display repositories
        fetchRepositories();

    } catch (error) {
        console.error('Error fetching GitHub profile:', error);
    }
}

// Fetch GitHub Repositories
async function fetchRepositories() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
        const repos = await response.json();

        elements.projectsContainer.innerHTML = repos
            .map(repo => `
                <div class="project-card">
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'No description available'}</p>
                    <p>
                        ${repo.language ? `<span><i class="fas fa-code"></i> ${repo.language}</span>` : ''}
                        <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                        <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                    </p>
                    <a href="${repo.html_url}" target="_blank" class="btn">View Project</a>
                </div>
            `)
            .join('');

    } catch (error) {
        console.error('Error fetching repositories:', error);
        elements.projectsContainer.innerHTML = '<p>Error loading projects</p>';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', fetchGitHubProfile);