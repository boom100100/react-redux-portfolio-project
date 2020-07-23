class ProjectsController < ApplicationController
  def create
    project = Project.create(name: params['name'], abstract: params['abstract'], user_id: User.find_by(email: params['user_email']).id)

    #this lets frontend assign section title for ordering.
    first_section_title = SectionTitle.create(description: 'Write your introduction here.', name: 'Introduction', section_order: 0, project: project)

    # render json: {message: 'reached create', params: params, project: project} if project.id
    render json: project, only: [:id, :name, :abstract], :include => [:section_titles=> {:include => [:section_title_children => {:only => [:id, :name, :type, :url, :description, :child_order, :content, :section_title_id, :section_order]}]}]
  end

  def update

    project = Project.find_by(id: params['id'].to_i)
    # render json: {user_id: params['project']['user_id'], project: project, params: params, id: params[:id].to_i, id2: params['id'].to_i}
    if project
      project.abstract = params['abstract']
      project.name = params['name']
      # project.user_id = params['project']['user_id']
      if project.save!
        render json: project, only: [:id, :name, :abstract]#, :user_id]#, include: [:section_titles=> {:include => [:section_title_children => {:only => [:id, :name, :type, :url, :description, :child_order, :content, :section_title_id, :section_order]}]}]
        # render json: {message: 'reached update', params: params, project: project} #if project.id
      end
    end
  end

  def destroy
    project = Project.find_by(id: params[:id])

    if project
      id = project.id
      project.destroy
      render json: {message: 'projects#destroyed_all.', params: params}
    else
      render json: {message: 'projects#destroyed_all failed', params: params}
    end
  end

=begin
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
=end
end
