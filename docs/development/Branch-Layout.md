# Ampache Branch Layouts

To help structure code a bit better Ampache has split repo activity into the following types

* Development: A place where the majority of Ampache development happens
* Release: Once a satisfactory release is ready in a development repo it is moved to a release branch
* Patch/Bugfix: Temporary branches used to conduct bugfix releases in a current release repo

All releases are tagged from the release repos allowing a merge from master when the release is complete. By keeping release branches separated from regular development this allows users to stay on a git release branch that will always be tested and stable.

## develop

Ampache Development has commonly occurred inside the develop repo.

Develop is still the primary repository and where all people interested in development should start when bug fixing/working on the project.

The version of the develop repo is **always** develop.

## master

In the new layout, master is no longer a release branch! There is now an extended process to avoid diverging the code.

* Develop is merged into master, signifying the start of a new release.
* A new version based on the current develop code is assigned to the master branch 'x.x.x-develop'
  * This version remains until the release is completed and ready to move into a release branch
* Code is maintained in parallel to develop and any fixes from master should be merged back into develop
* After testing and code is stable; create a pull request merge into the correct release branch
  * e.g. version 4.4.0-develop merges into the release4 branch
* Move on to the release branch and follow the [release process](https://github.com/ampache/ampache/blob/master/docs/RELEASE-PROCESS.md)

Master branch version is decided based on what is committed from develop/edge and will change from 'x.x.x-develop' to 'x.x.x-release' once ready to merge into release branches.

## edge

The edge repo is where large or breaking changes are maintained until they can be merged into develop. Anything that would cause a breakage for the current release version must go into edge until it is deemed ready.

Edge **must** merge with develop regularly to ensure divergence is kept at a minimum.

The version of the edge repo is **always** edge.

## release

Release branches are created for each major version number of Ampache. (e.g. release4 for Ampache 4.4.0, release5 for Ampache 5.0.0, etc)

If there is no current release branch for your version (e.g. there is no release6 branch for Ampache 6.0.0) create a new branch using the stable master branch and follow the standard release process.

Make sure to only tag the release from the release branch and not master.

* For existing release branches complete a pull request and then follow the release process.
* Do not rely on master branch being the same/stable version that you are working on.
* Fork the release branch into a patch branch and delete after the bugfix pull has merged.

The version of a release repo is **always** 'x.x.x-release'

## patch/bugfix

These are temporary branches that are created to maintain the current releases

* Bug fixes for the branches will occur in **forked** release branches and will have point releases tagged from that branch. eg 4.3.1, 4.3.2
* Develop and master will continue on the next milestone
* The version of maintenance branches will be incremented based on the current version being maintained (e.g. 'x.x.x-develop')
* Patch branches will be deleted after being merged into a new release

Like master the version will change from 'x.x.x-develop' to 'x.x.x-release' once ready to merge into release branches.
