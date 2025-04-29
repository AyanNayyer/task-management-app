from flask import Blueprint, request, jsonify
from extensions import db
from models import Task
from flask_jwt_extended import jwt_required, get_jwt_identity

tasks_bp = Blueprint('tasks', __name__)

@tasks_bp.route('', methods=['GET'])
@jwt_required()
def get_tasks():
    user_id = get_jwt_identity()
    status = request.args.get('status')
    query = Task.query.filter_by(user_id=user_id)
    if status and status != 'All':
        query = query.filter_by(status=status.lower())
    tasks = query.order_by(Task.created_at.desc()).all()
    return jsonify([{
        'id': t.id,
        'title': t.title,
        'description': t.description,
        'status': t.status,
        'priority': t.priority,
        'created_at': t.created_at,
        'user_id': t.user_id
    } for t in tasks])

@tasks_bp.route('', methods=['POST'])
@jwt_required()
def add_task():
    user_id = get_jwt_identity()
    data = request.get_json()
    task = Task(
        title=data['title'],
        description=data.get('description', ''),
        priority=data.get('priority', 'Medium'),
        status='incomplete',
        user_id=user_id
    )
    db.session.add(task)
    db.session.commit()
    return jsonify({'message': 'Task added', 'task_id': task.id})

@tasks_bp.route('/<int:task_id>', methods=['PATCH'])
@jwt_required()
def update_task(task_id):
    user_id = get_jwt_identity()
    task = Task.query.filter_by(id=task_id, user_id=user_id).first_or_404()
    data = request.get_json()
    for field in ['title', 'description', 'priority', 'status']:
        if field in data:
            setattr(task, field, data[field])
    db.session.commit()
    return jsonify({'message': 'Task updated'})

@tasks_bp.route('/<int:task_id>', methods=['DELETE'])
@jwt_required()
def delete_task(task_id):
    user_id = get_jwt_identity()
    task = Task.query.filter_by(id=task_id, user_id=user_id).first_or_404()
    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': 'Task deleted'})
