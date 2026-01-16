from django.urls import path

from .views import CreateUserView,NoteDelete,NoteListCreate


urlpatterns = [
    path('',NoteListCreate.as_view(),name='note-list'),
    path('delete/<int:pk>',NoteDelete.as_view(),name= 'note-delete'),

]