# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user_a = User.create(email: 'a@a.a', password: 'aaaaaa', password_confirmation: 'aaaaaa')
user_b = User.create(email: 'b@b.b', password: 'bbbbbb', password_confirmation: 'bbbbbb')
user_c = User.create(email: 'c@c.c', password: 'cccccc', password_confirmation: 'cccccc')
user_d = User.create(email: 'd@d.d', password: 'dddddd', password_confirmation: 'dddddd')
user_e = User.create(email: 'e@e.e', password: 'eeeeee', password_confirmation: 'eeeeee')

project_a = Project.create(name: 'project a', abstract: 'a', user: user_a)

title_a = SectionTitle.create(name: 'title 1', project: project_a, section_order: 0)
title_b = SectionTitle.create(name: 'title 2', project: project_a, section_order: 1)

prelim_data_a = PreliminaryDatum.create(name: 'prelim 1', url: 'https://google.com', description: 'a', content: 'a', section_title: title_a, child_order: 0, section_order: 0)
prelim_data_b = PreliminaryDatum.create(name: 'prelim 2', url: 'https://google.com', description: 'b', content: 'b', section_title: title_b, child_order: 0, section_order: 1)

research_data_a = ResearchDatum.create(name: 'research 1', url: 'https://google.com', description: 'a', content: 'a', section_title: title_a, child_order: 1, section_order: 0)
research_data_b = ResearchDatum.create(name: 'research 2', url: 'https://google.com', description: 'b', content: 'b', section_title: title_b, child_order: 1, section_order: 1)

random_data_a = RandomDatum.create(name: 'random 1', url: 'https://google.com', description: 'a', content: 'a', section_title: title_a, child_order: 2, section_order: 0)
random_data_b = RandomDatum.create(name: 'random 2', url: 'https://google.com', description: 'b', content: 'b', section_title: title_b, child_order: 2, section_order: 1)

graph_a = Graph.create(name: 'graph 1', url: 'https://google.com', description: 'a', section_title: title_a, child_order: 3, section_order: 0)
graph_b = Graph.create(name: 'graph 2', url: 'https://google.com', description: 'b', section_title: title_b, child_order: 3, section_order: 1)
