import React from 'react';
import '../css/ForumPage.css';


import Header from '../components/Header';
import Footer from '../components/Footer';

function ForumPage() {
  return (
    <div className="forum-page">
      {/* Header at the top */}
      <Header />

      <div className="content">
        <div className="main-forum">
          <h2>Amber Alert System — General Discussions</h2>
          <div className="forum-box">
            <div className="section-title">Community Forum</div>

            <div className="threads">
              <div className="thread">
                <div>
                  <strong>Accident near Main St @ 3PM</strong><br />
                  <span>Anonymous  May 16, 2025 at 3:05 PM</span><br />
                  <span>Replies: 2 | Views: 100</span>
                </div>
                <div className="reply-user">Yesterday at 4:48 AM<br />Anonymous</div>
              </div>

              <div className="thread">
                <div>
                  <strong>Accident near Main St @ 3PM</strong><br />
                  <span>Anonymous   Dec 24, 2024 at 3:05 PM</span><br />
                  <span>Replies: 0 | Views: 1k</span>
                </div>
                <div className="reply-user">Yesterday at 4:48 AM<br />Anonymous</div>
              </div>

              <div className="thread">
                <div>
                  <strong>Accident near Main St @ 3PM</strong><br />
                  <span>Anonymous   Mar 3, 2025 at 3:05 PM</span><br />
                  <span>Replies: 4 | Views: 24</span>
                </div>
                <div className="reply-user">Yesterday at 4:48 AM<br />Anonymous</div>
              </div>

              <div className="thread">
                <div>
                  <strong>Huge traffic near Main St Town</strong><br />
                  <span>Hailee   Apr 10, 2025 at 2:55 PM</span><br />
                  <span>Replies: 10 | Views: 134</span>
                </div>
                <div className="reply-user">Yesterday at 4:48 AM<br />Anonymous</div>
              </div>
            </div>

            <div className="pagination">
              <button>1</button>
              <button>2</button>
              <button>3</button>
              <span>...</span>
              <button>25</button>
            </div>

            <div className="forum-buttons">
              <button className="resources-btn">Helpful Resources</button>
              <button className="view-alerts-btn">View All Alerts</button>
            </div>
          </div>
        </div>

        <div className="sidebar">
          <h4>New Posts</h4>
          <ul>
            <li>Accident near Main St @ 3PM - 5 min ago</li>
            <li>Accident near Main St @ 3PM - 20 min ago</li>
            <li>Accident near Main St @ 3PM - 33 min ago</li>
            <li>Accident near Main St @ 3PM - 2 min ago</li>
          </ul>
        </div>
      </div>


      <Footer />
    </div>
  );
}

export default ForumPage;
