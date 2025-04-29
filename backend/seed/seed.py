from app import create_app
from extensions import db
from models import User, Task
from extensions import bcrypt

app = create_app()

with app.app_context():
    # Clear existing data
    Task.query.delete()
    User.query.delete()
    db.session.commit()

    # Create users
    user1 = User(email="alice@example.com", password=bcrypt.generate_password_hash("password123").decode("utf-8"))
    user2 = User(email="bob@example.com", password=bcrypt.generate_password_hash("password123").decode("utf-8"))
    db.session.add_all([user1, user2])
    db.session.commit()

    # Create tasks
    tasks = [
        Task(title="Buy groceries", description="Milk, Bread, Eggs", priority="High", status="incomplete", user_id=user1.id),
        Task(title="Read book", description="Finish React docs", priority="Medium", status="incomplete", user_id=user1.id),
        Task(title="Workout", description="Run 5km", priority="Low", status="complete", user_id=user2.id),
    ]
    db.session.add_all(tasks)
    db.session.commit()

    print("Seed data inserted!")
