export default function StatCard({ title, value, icon, highlight }) {
    return (
          <div className={`stat-card ${highlight ? "highlight" : ""}`}>
                  <div className="stat-icon">{icon}</div>div>
                <div>
                        <strong>{value}</strong>strong>
                        <span>{title}</span>span>
                </div>div>
          </div>div>
        );
}</div>
