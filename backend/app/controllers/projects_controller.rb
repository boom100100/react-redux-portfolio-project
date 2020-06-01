class ProjectsController < ApplicationController
  def update
    #updates or creates project
    project = Project.find(id: params['id'])
    if project
      project.abstract = params['abstract']
      project.name = params['name']
      project.user_id = params['project']['user_id']
      project.save
    else
      project = Project.find_or_create_by(name: params['name'], user_id: params['project']['user_id'], abstract: params['abstract'])
    end

    section_titles = params[:section_titles]
    section_title_children = []
    title = nil

    #update section titles and their order
    section_titles.each do |section_title|
      title = SectionTitle.find_or_create_by(name: section_title['name'])
      title.section_order = section_title['section_order']
      title.project_id = section_title['project_id']
      title.save

      #derived from post data, not current db state
      section_title_children = [*section_title_children, *section_title.section_title_children]
    end

    section_title_children.each do |child|
      #if post data's section title children
      #included in database
      #update
      #if not, create
      #how to to wknow which to delete?
    end

    render json: {params: params, title: title}#, project: Project.find_by(id: params[:id]), include: [:section_titles] }
    
  end
end
