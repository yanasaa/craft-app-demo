from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Класс для проверки разрешений на редактирование только собственного профиля
    """

    def has_permission(self, request, view):
        if request.method == 'GET':
            return True
        return request.user and request.user == view.get_object().user